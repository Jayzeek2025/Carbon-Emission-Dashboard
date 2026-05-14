import type { Post } from "@/types/emissions";

import "./DeletePostModal.css";

type DeletePostModalProps = {
  post: Post;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeletePostModal({
  post,
  onClose,
  onConfirm,
}: DeletePostModalProps) {
  return (
    <div className="delete-post-modal-backdrop">
      <div className="delete-post-modal">
        <div className="delete-post-modal-globe" />

        <div className="delete-post-modal-content">
          <p className="delete-post-modal-label">Confirm Delete</p>

          <h3>Delete this post?</h3>

          <p>
            This action will remove <strong>{post.title}</strong> from your
            sustainability posts.
          </p>

          <div className="delete-post-modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>

            <button type="button" onClick={onConfirm}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
