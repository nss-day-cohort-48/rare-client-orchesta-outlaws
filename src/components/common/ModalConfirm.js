import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

export const ModalConfirm = ({
  state,
  setState,
  yesAction,
  yesText,
  noAction,
  noText,
  body,
  ...props
}) => {
  return (
    <Modal
      className="modal"
      show={state}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      {...props}
    >
      <Modal.Header className="modal_header" closeButton></Modal.Header>
      <Modal.Body>
        <p>{body}</p>
      </Modal.Body>
      <Modal.Footer className="modal_footer">
        <Button
          onClick={() => {
            yesAction && yesAction();
            setState(false);
          }}
        >
          {yesText || "Yes"}
        </Button>
        <Button
          onClick={() => {
            noAction && noAction();
            setState(false);
          }}
        >
          {noText || "No"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
