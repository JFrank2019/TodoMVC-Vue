(function (Vue) {

	const STORAGE_KEY = 'items-vuejs'

	const itemStorage = {
		// 获取本地数据
		fetch() {
			return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
		},
		// 保存本地数据
		save(items) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
		}
	}

	const items = [
		// {
		// 	id: 1,
		// 	content: 'Vue.js',
		// 	completed: false // 是否完成
		// },
		// {
		// 	id: 2,
		// 	content: 'React.js',
		// 	completed: true
		// },
		// {
		// 	id: 3,
		// 	content: 'Angular.js',
		// 	completed: true
		// }
	]

	// 用于刷新页面时自动聚焦
	Vue.directive('app-focus', {
		inserted(el) {
			el.focus()
		}
	})

	const app = new Vue({
		el: '#todoapp',
		data() {
			return {
				// items,
				items: itemStorage.fetch(), // 获取本地数据进行初始化
				currentItem: null, // 当前点击项
				filterStatus: 'all' // 接收变化的状态值
			}
		},
		computed: {
			// 过滤所有未完成的任务项
			remaining() {
				return this.items.filter(item => !item.completed).length
			},
			// 全局开关
			toggleAll: {
				get() {
					// 当 this.remaining发生变化后，会触发该方法运行
					// 当所有未完成任务数为 0， 表示全部完成，则返回 true，让复选框选中，反之不选中
					return this.remaining === 0
				},
				set(newStatus) {
					// 当点击checkbox 复选框后状态变化后，就会触发该方法执行
					// 迭代出数组每个元素，把当前状态值赋给每个元素的 completed
					this.items.forEach(item => (item.completed = newStatus))
				}
			},
			// 过滤不同的状态数据
			filterItems() {
				// this.filterStatus 作为条件，变化后过滤不同数据
				switch (this.filterStatus) {
					case 'active': // 过滤未完成的数据
						return this.items.filter(item => !item.completed)
						break
					case 'completed': // 过滤已完成的数据
						return this.items.filter(item => item.completed)
						break
					default: // 其他: 返回所有数据
						return this.items
				}
			}
		},
		methods: {
			addItem(e) {
				// 1. 获取输入的数据
				const content = e.target.value.trim()
				// 2. 如果数据为空，则什么都不做
				if (!content.length) return
				// 3. 如果不为空，则添加到数组中 - 生成id、 添加到数组中(默认状态为未完成)
				const id = this.items.length + 1
				this.items.push({
					id,
					content,
					completed: false
				})
				// 4. 清空文本框内容
				e.target.value = ''
			},
			// 删除项目
			removeItem(index) {
				// 移除索引为index的一条记录
				this.items.splice(index, 1)
			},
			// 清除完成的项目
			removeCompleted() {
				this.items = this.items.filter(item => !item.completed)
			},
			// 编辑项目
			toEdit(item) {
				this.currentItem = item
			},
			// 取消编辑
			cancelEdit() {
				// 移除样式 => 将 currentItem 置空
				this.currentItem = null
			},
			// 编辑完成
			finishEdit(item, index, event) {
				const content = event.target.value.trim()
				// 1. 如果为空，则进行删除任务项
				if (!content) {
					this.removeItem(index)
					return
				}
				// 2. 添加任务到任务项 items 中
				item.content = content
				// 3. 移除 .editing 样式
				this.currentItem = null
			}
		},
		watch: {
			// 如果items发生变速，这个函数就会执行
			items: {
				deep: true, // 深度监听
				handler(newItems, oldItems) {
					// 本地进行存储
					itemStorage.save(newItems)
				}
			}
		},
		// 自定义局部指令，用于编辑输入框
		directives: {
			'todo-focus': {
				// 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新
				update(el, binding) {
					if (binding.value) {
						el.focus()
					}
				}
			}
		}
	})

	// 当路由 hash 值改变后会自动调用此函数
	window.onhashchange = function() {
		// 1. 获取点击路由的 hash , 当截取的hash不为空返回截取的，为空时返回 'all'
		const hash = window.location.hash.substr(2) || 'all'
		// 2. 状态一旦改变，将hash赋值给 filterStatus
		// 当计算属性 filterItems 感知到 filterStatus 变化后，就会重新过滤
		// 当 filterItems 重新过滤出目标数据后，则自动同步更新到视图中
		app.filterStatus = hash
	}

})(Vue);
