"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import styles from "./post-form.module.css";

export const PostForm = ({
  afterSubmit
}: { afterSubmit?: () => void }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const post = formData.get("post")?.toString().trim();

    if (!post) return;

    setLoading(true);
    
    await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({ post }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    setLoading(false);
    formRef.current?.reset();

    if (afterSubmit) {
      afterSubmit();
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Enter") return;

    if (!e.shiftKey) {
      e.preventDefault();
      formRef.current?.dispatchEvent(new Event("submit", { bubbles: true }));
    }
  }

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit} ref={formRef}>
      <textarea
        name="post"
        className={styles.postInput}
        rows={4}
        placeholder="What's on your mind?"
        onKeyDown={onKeyDown}
      />
      <button className={styles.submit} disabled={loading}>
        Post
      </button>
    </form>
  );
}