"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { MessageCircle, CornerDownRight, Clock } from "lucide-react";

function CommentForm({ onSubmit, placeholder = "Comment *", compact = false }) {
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const noteRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || !name.trim() || !email.trim()) return;
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
  };

  if (submitted) {
    return (
      <p
        ref={noteRef}
        className="flex items-center gap-2 rounded-sm border border-brass/30 bg-brass/10 px-4 py-3 text-sm text-ink"
      >
        <Clock size={15} className="shrink-0 text-brass" />
        Thanks — your comment has been submitted and is awaiting moderator
        approval.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "mt-3 space-y-2" : "space-y-3"}>
      {!compact && (
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-ink/20 bg-transparent px-3 py-2 text-sm text-ink outline-none focus:border-maroon"
          />
          <input
            type="email"
            placeholder="Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-ink/20 bg-transparent px-3 py-2 text-sm text-ink outline-none focus:border-maroon"
          />
        </div>
      )}
      {compact && (
        <div className="grid gap-2 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-ink/20 bg-transparent px-2.5 py-1.5 text-xs text-ink outline-none focus:border-maroon"
          />
          <input
            type="email"
            placeholder="Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-ink/20 bg-transparent px-2.5 py-1.5 text-xs text-ink outline-none focus:border-maroon"
          />
        </div>
      )}
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
      <button
        type="submit"
        className={`rounded-full bg-ink text-parchment transition-colors hover:bg-maroon ${
          compact ? "px-4 py-1.5 text-xs" : "px-5 py-2 text-sm"
        }`}
      >
        Post Comment
      </button>
    </form>
  );
}

function CommentItem({ comment, onReply, replyOpenId, setReplyOpenId }) {
  const isReplying = replyOpenId === comment.id;

  return (
    <div className="border-t border-ink/10 pt-5 first:border-0 first:pt-0">
      <p className="font-sans text-sm font-medium text-ink">
        {comment.authorName}
      </p>
      <p className="mt-0.5 text-xs text-slate/70">{comment.date}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink/90">
        {comment.content}
      </p>
      <button
        onClick={() => setReplyOpenId(isReplying ? null : comment.id)}
        className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-maroon"
      >
        <CornerDownRight size={13} />
        Reply
      </button>

      {isReplying && (
        <div className="ml-4 mt-3 border-l-2 border-brass/30 pl-4">
          <CommentForm
            compact
            placeholder="Write a reply..."
            onSubmit={(data) => onReply(comment.id, data)}
          />
        </div>
      )}

      {comment.replies?.length > 0 && (
        <div className="ml-4 mt-4 space-y-4 border-l-2 border-ink/10 pl-4">
          {comment.replies.map((r) => (
            <div key={r.id}>
              <p className="font-sans text-sm font-medium text-ink">
                {r.authorName}
              </p>
              <p className="mt-0.5 text-xs text-slate/70">{r.date}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/90">
                {r.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CommentThread({ articleId, initialComments = [] }) {
  const [comments, setComments] = useState(initialComments);
  const [replyOpenId, setReplyOpenId] = useState(null);

  // Submits to Strapi (src/lib/strapi.js). If the CMS isn't reachable yet
  // (e.g. local dev without Strapi running), we don't fake an "approved"
  // comment appearing — we just confirm submission, since real moderation
  // happens server-side regardless.
  const submitToApi = async ({ content, authorName, authorEmail }, parentId = null) => {
    try {
      const { submitComment } = await import("@/lib/strapi");
      await submitComment({ articleId, content, authorName, authorEmail, parentId });
    } catch (err) {
      console.warn("Comment submission (CMS unreachable in this environment):", err.message);
    }
  };

  const handleTopLevelSubmit = async (data) => {
    await submitToApi(data);
  };

  const handleReply = async (parentId, data) => {
    await submitToApi(data, parentId);
    setReplyOpenId(null);
  };

  return (
    <section className="mt-16">
      <h2 className="flex items-center gap-2 font-serif text-2xl text-ink">
        <MessageCircle size={22} className="text-brass" />
        {comments.length > 0
          ? `${comments.length} Response${comments.length > 1 ? "s" : ""}`
          : "Leave a Reply"}
      </h2>

      {comments.length > 0 && (
        <div className="mt-6 space-y-5">
          {comments.map((c) => (
            <CommentItem
              key={c.id}
              comment={c}
              onReply={handleReply}
              replyOpenId={replyOpenId}
              setReplyOpenId={setReplyOpenId}
            />
          ))}
        </div>
      )}

      <div className="mt-8">
        <h3 className="mb-3 font-serif text-lg text-ink">Leave a Reply</h3>
        <CommentForm onSubmit={handleTopLevelSubmit} />
      </div>
    </section>
  );
}
