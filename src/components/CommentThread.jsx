"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { MessageCircle, CornerDownRight, Clock } from "lucide-react";
import { submitComment } from "@/lib/strapi";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function CommentForm({ onSubmit, placeholder = "Comment *", compact = false }) {
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const noteRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || !name.trim() || !email.trim()) return;
    setError(null);
    try {
      await onSubmit({ content, authorName: name, authorEmail: email });
      setContent("");
      setName("");
      setEmail("");
      setSubmitted(true);
      requestAnimationFrame(() => {
        gsap.fromTo(
          noteRef.current,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
        );
      });
    } catch {
      setError(
        "Couldn't reach the CMS to submit this. If Strapi isn't running locally, that's why — this form works once it's up."
      );
    }
  };

  if (submitted) {
    return (
      <p
        ref={noteRef}
        className="flex items-center gap-2 border border-brass/30 bg-brass/10 px-4 py-3 text-sm text-ink"
      >
        <Clock size={15} className="shrink-0 text-brass" />
        Thanks — your comment has been submitted and is awaiting moderator
        approval.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "mt-3 space-y-2" : "space-y-3"}>
      <div className={`grid gap-${compact ? "2" : "3"} sm:grid-cols-2`}>
        <input
          type="text"
          placeholder="Name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={`border border-ink/20 bg-transparent text-ink outline-none focus:border-maroon ${
            compact ? "px-2.5 py-1.5 text-xs" : "px-3 py-2 text-sm"
          }`}
        />
        <input
          type="email"
          placeholder="Email *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={`border border-ink/20 bg-transparent text-ink outline-none focus:border-maroon ${
            compact ? "px-2.5 py-1.5 text-xs" : "px-3 py-2 text-sm"
          }`}
        />
      </div>
      <textarea
        rows={compact ? 2 : 4}
        placeholder={placeholder}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className={`w-full resize-none border border-ink/20 bg-transparent outline-none focus:border-maroon ${
          compact ? "px-2.5 py-1.5 text-xs" : "px-3 py-2 text-sm"
        }`}
      />
      {error && <p className="text-xs text-maroon">{error}</p>}
      <button
        type="submit"
        className={`bg-ink text-parchment transition-colors hover:bg-maroon ${
          compact ? "px-4 py-1.5 text-xs" : "px-5 py-2 text-sm"
        }`}
      >
        Post Comment
      </button>
    </form>
  );
}

function ReplyPanel({ open, children }) {
  const wrapRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (open) {
      gsap.fromTo(el, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" });
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
    }
  }, [open]);

  return (
    <div ref={wrapRef} className="overflow-hidden" style={{ height: 0 }}>
      <div className="ml-4 mt-3 border-l-2 border-brass/30 pl-4">{children}</div>
    </div>
  );
}

function CommentItem({ comment, onReply, replyOpenId, setReplyOpenId }) {
  const isReplying = replyOpenId === comment.documentId;

  return (
    <div className="border-t border-ink/10 pt-5 first:border-0 first:pt-0">
      <p className="font-sans text-sm font-medium text-ink">{comment.authorName}</p>
      <p className="mt-0.5 text-xs text-ink/45">{formatDate(comment.createdAt)}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink/90">{comment.content}</p>
      <button
        onClick={() => setReplyOpenId(isReplying ? null : comment.documentId)}
        className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-maroon"
      >
        <CornerDownRight size={13} />
        Reply
      </button>

      <ReplyPanel open={isReplying}>
        <CommentForm
          compact
          placeholder="Write a reply..."
          onSubmit={(data) => onReply(comment.documentId, data)}
        />
      </ReplyPanel>

      {comment.replies?.length > 0 && (
        <div className="ml-4 mt-4 space-y-4 border-l-2 border-ink/10 pl-4">
          {comment.replies.map((r) => (
            <div key={r.documentId}>
              <p className="font-sans text-sm font-medium text-ink">{r.authorName}</p>
              <p className="mt-0.5 text-xs text-ink/45">{formatDate(r.createdAt)}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/90">{r.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Displays approved comments (already filtered server-side by
 * getArticleBySlug) and lets visitors submit new ones or replies.
 * New submissions never appear immediately — they're `pending` until
 * approved in the Strapi Admin, per the moderation policy from Step 3.
 */
export default function CommentThread({ articleDocumentId, initialComments = [] }) {
  const [comments] = useState(initialComments);
  const [replyOpenId, setReplyOpenId] = useState(null);

  const handleTopLevelSubmit = async (data) => {
    await submitComment({ articleDocumentId, ...data });
  };

  const handleReply = async (parentDocumentId, data) => {
    await submitComment({ articleDocumentId, parentDocumentId, ...data });
    setReplyOpenId(null);
  };

  return (
    <section className="mt-16">
      <h2 className="flex items-center gap-2 font-display text-2xl text-ink">
        <MessageCircle size={22} className="text-brass" />
        {comments.length > 0
          ? `${comments.length} Response${comments.length > 1 ? "s" : ""}`
          : "Leave a Reply"}
      </h2>

      {comments.length > 0 && (
        <div className="mt-6 space-y-5">
          {comments.map((c) => (
            <CommentItem
              key={c.documentId}
              comment={c}
              onReply={handleReply}
              replyOpenId={replyOpenId}
              setReplyOpenId={setReplyOpenId}
            />
          ))}
        </div>
      )}

      <div className="mt-8">
        <h3 className="mb-3 font-display text-lg text-ink">Leave a Reply</h3>
        <CommentForm onSubmit={handleTopLevelSubmit} />
      </div>
    </section>
  );
}
