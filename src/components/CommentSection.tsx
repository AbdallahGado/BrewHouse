import { useState } from "react";

type Comment = {
  id: number;
  author: string;
  content: string;
};

const CommentSection = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        { id: comments.length + 1, author: "Anonymous", content: newComment },
      ]);
      setNewComment("");
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-4">Comments</h3>
      <ul className="space-y-4">
        {comments.map((comment) => (
          <li key={comment.id} className="border-b pb-2">
            <p className="font-medium">{comment.author}</p>
            <p>{comment.content}</p>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full border rounded p-2"
          placeholder="Add a comment..."
        />
        <button
          onClick={handleAddComment}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Post Comment
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
