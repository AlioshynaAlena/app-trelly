import type { Task } from "./types";

type Props = {
  task: Task;
  isSelected: boolean;
  //функция, которая возвращает ничего, но должна принимать trackId
  onSelect: (taskId: string, boardId: string) => void;
};

export function TaskListItem(props: Props) {
  const color = props.isSelected ? "red" : "green";

  return (
    <li style={{ color: color }}>
      {/* когда по h4 кликнут я отреагирую callback'ом (т.е. создам функцию) передам внутрь h4, чтобы h4 меня уведомил  */}
      <h4
        onClick={() => {
          props.onSelect(props.task.id, props.task.attributes.boardId);
        }}
      >
        {props.task.attributes.title}
      </h4>
    </li>
  );
}
