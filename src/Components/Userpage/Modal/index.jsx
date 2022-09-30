import React, { useState } from "react";
import { StyleModalBox, StyleModal, StyleInput } from "./style";
import { useGoal } from "../../../Hooks/useGoal";
import { usePutGoal } from "../../../Hooks/usePutGoal";
import { useRecoilState } from "recoil";
import { ModalState } from "../../../Recoil/Atoms/OptionAtoms";
const Modal = ({ done }) => {
  const { mutate: post } = useGoal();
  const { mutate: put } = usePutGoal();

  const [modal, setModal] = useRecoilState(ModalState);
  const [goal, setGoal] = useState({
    goal: ""
  });
  const onChangeHandeler = e => {
    const { name, value } = e.target;
    setGoal({ ...goal, [name]: value });
  };

  const onSubmitHandeler = () => {
    post(goal);
    setModal(false);
    setGoal({
      goal: ""
    });
  };
  const onPutHandeler = () => {
    put(goal);
    setGoal({
      goal: ""
    });
    setModal(false);
  };
  return (
    <StyleModalBox>
      <StyleModal>
        <p>일주일 간의 목표를 설정해주세요!</p>
        <StyleInput
          name="goal"
          onChange={onChangeHandeler}
          type="number"
          min="0"
          value={goal.goal}
          placeholder="0km"
        ></StyleInput>
        <div>
          <button
            onClick={() => {
              setModal(false);
            }}
          >
            취소
          </button>
          {done ? (
            <button
              onClick={() => {
                onPutHandeler();
              }}
            >
              수정
            </button>
          ) : (
            <button
              onClick={() => {
                onSubmitHandeler();
              }}
            >
              설정
            </button>
          )}
        </div>
      </StyleModal>
    </StyleModalBox>
  );
};
export default Modal;
