import { ref } from 'vue';

const userActionTypes = {
  unReplier: 3, // 未回复人
  mainUnViewer: 2, // 次传阅人
  secondaryUnViewer: 1, // 主传阅人
};

const action = {
  undo: 0, // 未完成待办
  done: 1, // 已完成待办
};
export const useUnReplierUsers = (users) =>
  ref(users.filter((user) => user.status === action.undo && user.type === userActionTypes.unReplier));

// 未传阅人
export const useUnViewerUsers = (users) =>
  ref(
    users.filter(
      (user) =>
        user.status === action.undo &&
        [userActionTypes.mainUnViewer, userActionTypes.secondaryUnViewer].includes(user.type),
    ),
  );
