"use client";

import { useEffect, useState, useCallback } from "react";
import type { Comment } from "@/lib/supabase";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const LIKED_KEY = "liked_comments";
function getLiked(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(LIKED_KEY) ?? "[]"));
  } catch {
    return new Set();
  }
}
function saveLiked(set: Set<string>) {
  localStorage.setItem(LIKED_KEY, JSON.stringify([...set]));
}

function CommentForm({
  slug,
  parentId,
  onSubmitted,
  onCancel,
  compact,
}: {
  slug: string;
  parentId?: string;
  onSubmitted: () => void;
  onCancel?: () => void;
  compact?: boolean;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          author_name: name,
          author_email: email,
          content: text,
          ...(parentId ? { parent_id: parentId } : {}),
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error ?? "Something went wrong");
      }
      onSubmitted();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form className={`comment-form${compact ? " comment-form--compact" : ""}`} onSubmit={handleSubmit}>
      <div className="comment-form-row">
        <label className="comment-label">
          Name
          <input className="comment-input" type="text" value={name} onChange={(e) => setName(e.target.value)} required maxLength={100} disabled={status === "submitting"} />
        </label>
        <label className="comment-label">
          Email <span className="comment-label-note">(not published)</span>
          <input className="comment-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={254} disabled={status === "submitting"} />
        </label>
      </div>
      <label className="comment-label">
        {parentId ? "Reply" : "Comment"}
        <textarea className="comment-textarea" value={text} onChange={(e) => setText(e.target.value)} required maxLength={2000} rows={compact ? 3 : 4} disabled={status === "submitting"} />
      </label>
      {status === "error" && <p className="comment-error">{errorMsg}</p>}
      <div className="comment-form-actions">
        <button className="comment-submit" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Submitting…" : parentId ? "Post reply" : "Submit"}
        </button>
        {onCancel && (
          <button type="button" className="comment-cancel-btn" onClick={onCancel} disabled={status === "submitting"}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

function CommentItem({
  comment,
  replies,
  slug,
  likedIds,
  likeCounts,
  onLike,
  onReplySubmitted,
}: {
  comment: Comment;
  replies: Comment[];
  slug: string;
  likedIds: Set<string>;
  likeCounts: Record<string, number>;
  onLike: (id: string) => void;
  onReplySubmitted: () => void;
}) {
  const [replyOpen, setReplyOpen] = useState(false);
  const liked = likedIds.has(comment.id);
  const likes = likeCounts[comment.id] ?? comment.likes ?? 0;

  return (
    <li className="comment">
      <div className="comment-meta">
        <span className="comment-author">{comment.author_name}</span>
        <time className="comment-date">{formatDate(comment.created_at)}</time>
      </div>
      <p className="comment-content">{comment.content}</p>
      <div className="comment-actions">
        <button
          type="button"
          className={`comment-like-btn${liked ? " comment-like-btn--liked" : ""}`}
          onClick={() => onLike(comment.id)}
          disabled={liked}
          aria-label={`Like this comment (${likes})`}
        >
          ♥ {likes > 0 ? likes : ""}
        </button>
        <button
          type="button"
          className="comment-reply-trigger"
          onClick={() => setReplyOpen((o) => !o)}
        >
          {replyOpen ? "Cancel reply" : "Reply"}
        </button>
      </div>

      {replies.length > 0 && (
        <ul className="comment-replies">
          {replies.map((r) => (
            <li key={r.id} className="comment comment--reply">
              <div className="comment-meta">
                <span className="comment-author">{r.author_name}</span>
                <time className="comment-date">{formatDate(r.created_at)}</time>
              </div>
              <p className="comment-content">{r.content}</p>
              <div className="comment-actions">
                <button
                  type="button"
                  className={`comment-like-btn${likedIds.has(r.id) ? " comment-like-btn--liked" : ""}`}
                  onClick={() => onLike(r.id)}
                  disabled={likedIds.has(r.id)}
                  aria-label={`Like this reply (${likeCounts[r.id] ?? r.likes ?? 0})`}
                >
                  ♥ {(likeCounts[r.id] ?? r.likes ?? 0) > 0 ? (likeCounts[r.id] ?? r.likes) : ""}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {replyOpen && (
        <div className="comment-reply-form">
          <CommentForm
            slug={slug}
            parentId={comment.id}
            compact
            onSubmitted={() => { setReplyOpen(false); onReplySubmitted(); }}
            onCancel={() => setReplyOpen(false)}
          />
        </div>
      )}
    </li>
  );
}

export default function CommentsSection({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});

  const fetchComments = useCallback(() => {
    fetch(`/api/comments?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((d) => setComments(d.comments ?? []));
  }, [slug]);

  useEffect(() => {
    fetchComments();
    setLikedIds(getLiked());
  }, [fetchComments]);

  async function handleLike(id: string) {
    if (likedIds.has(id)) return;
    const res = await fetch("/api/comments/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) return;
    const { likes } = await res.json();
    setLikeCounts((prev) => ({ ...prev, [id]: likes }));
    setLikedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      saveLiked(next);
      return next;
    });
  }

  const topLevel = comments.filter((c) => !c.parent_id);
  const repliesFor = (id: string) => comments.filter((c) => c.parent_id === id);

  return (
    <section className="comments-section">
      <h2 className="comments-heading">Comments</h2>

      {topLevel.length > 0 && (
        <ul className="comments-list">
          {topLevel.map((c) => (
            <CommentItem
              key={c.id}
              comment={c}
              replies={repliesFor(c.id)}
              slug={slug}
              likedIds={likedIds}
              likeCounts={likeCounts}
              onLike={handleLike}
              onReplySubmitted={fetchComments}
            />
          ))}
        </ul>
      )}

      {submitted ? (
        <p className="comments-thanks">Thanks — your comment is awaiting moderation.</p>
      ) : !formOpen ? (
        <button type="button" className="comment-add-btn" onClick={() => setFormOpen(true)}>
          Add a comment
        </button>
      ) : (
        <CommentForm
          slug={slug}
          onSubmitted={() => { setFormOpen(false); setSubmitted(true); }}
          onCancel={() => setFormOpen(false)}
        />
      )}
    </section>
  );
}
