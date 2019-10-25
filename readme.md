# TodoMVC - Vue.js

## 需求说明

1. 数据列表渲染

   - 当任务列表（items ）没有数据时， `#main` 和`#footer` 标识的标签应该被隐藏

     任务涉及字段 : id 、任务名称（name ）、是否完成（ `completed` true 为已完成）

2. 添加任务

   - 在最上面的文本框中添加新的任务。
   2. 不允许添加非空数据。
   3. 按 `Enter` 键添加任务列表中，并清空文本框。
   4. 当加载页面后文本框自动获得焦点，在 `input` 上使用 `autofocus` 属性可获得。

3. 显示所有未完成任务数

   - 左下角要显示未完成的任务数量。确保数字是由 `<strong>` 标签包装的。

   - 还要将 `item` 单词多元化( `1` 没有`s` , 其他数字均有s )： 0 items , 1 item , 2 items

     示例： `2 items left`

4. 切换所有任务状态

   - 点击复选框 `V` 后，将所有任务状态标记为复选框相同的状态。
   - 当 选中/取消 了单个任务时，复选框 `V` 也应同步更新。

5. 移除任务项

   - 悬停在某个任务项上显示 `X` 移除按钮，可点击移除当前任务项。

6. 清除所有已完成任务

   - 单击右下角 `Clear completed` 按钮时，移除所有已完成任务。
   - 单击 `Clear completed` 按钮后，确保复选框清除了选中状态。
   - 当列表中没有已完成的任务时，应该隐藏 `Clear completed` 按钮。

7. 编辑任务项

   - 双击`<label>`（某个任务项）进入编辑状态（在 `<li>` 上通过 .editing 进行切换状态）
   - 进入编辑状态后输入框显示原内容，并获取编辑焦点
   - 输入状态按 `Esc` 取消编辑，`editing` 样式应该被移除
   - 按 `Enter` 键或失去焦点时保存改变数据，移除 `editing` 样式

8. 路由状态切换（过滤不同状态数据）

   根据点击的不同状态（ `All` / `Active` / `Completed` ），进行过滤出对应的任务，并进行样式的切换。

9. 数据持久化

   将所有任务项数据持久化到 `localStorage` 中，它主要式用于本地存储数据
