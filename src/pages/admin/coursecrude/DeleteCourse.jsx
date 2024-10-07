import React, { useState } from "react";
import toastr from "toastr";
import "../../../assets/lib/toastr/toastr.css";

const DeleteCourse = ({ courseId, handleDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await handleDelete(courseId); // Call the delete function passed via props

      // Show success toastr message
      toastr.success("Course deleted successfully!");

      // Optionally, close the modal after success
      const modalElement = document.getElementById("deleteCourseModal");
      if (modalElement) {
        const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
      }
    } catch (error) {
      console.error("Error deleting course:", error);

      // Show error toastr message
      toastr.error("Failed to delete the course.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="deleteCourseModal"
        tabIndex="-1"
        aria-labelledby="deleteCourseModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteCourseModalLabel">
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
              Are you sure you want to delete this course?
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
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteCourse;

