"use client";

import { timeFromNow } from "@/uitils/timeFromNow";
import styles from "./post-list.module.css";
import { useEffect, useState } from "react";
import { PostForm } from "../post-form";

export const PostList = () => {
  const [posts, setPosts] = useState<Array<{
    content: string;
    user: string;
    timeStamp: number;
  }>>([]);

  const loadData = async () => {
    const response = await fetch("/api/post");

    if (!response.ok) return;

    const data = await response.json();
    console.log(data);
    setPosts(data);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <PostForm afterSubmit={loadData} />
      {posts.map((post, index) => (
        <div className={styles.post} key={index}>
          <div className={styles.info}>
            <p className={styles.user}>{post.user}</p>
            <p className={styles.time}>{timeFromNow(post.timeStamp)}</p>
          </div>
          <p>{post.content}</p>
        </div>
      ))}
    </>
  );
}