import React, { useState } from "react";

import { Spinner } from "react-bootstrap"; // Importing Spinner and Modal

import toastr from "toastr";
import "../../../assets/lib/toastr/toastr.css";

const DeleteVideo = ({ videoId, handleDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await handleDelete(videoId); // Callback to remove the deleted video from the list

      toastr.success("Video deleted successfully");
      // Optionally, close the modal after success
      const modalElement = document.getElementById("deleteVideoModal");
      if (modalElement) {
        const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
      }
    } catch (error) {
      toastr.error("Failed to delete video");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="deleteVideoModal"
        tabIndex="-1"
        aria-labelledby="deleteVideoModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteVideoModalLabel">
                Confirm Delete
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this video?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleConfirmDelete}
              >
                {isDeleting ? (
                  <span>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    ></Spinner>
                    <var style={{ margin: "5px" }}>Deleting... </var>
                  </span>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteVideo;
