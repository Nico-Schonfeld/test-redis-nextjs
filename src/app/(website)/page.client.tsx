"use client";

import React from "react";

const AppClient = ({
  comments,
}: {
  comments: {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
  }[];
}) => {
  return (
    <div>
      <pre>{JSON.stringify(comments, null, 5)}</pre>
    </div>
  );
};

export default AppClient;
