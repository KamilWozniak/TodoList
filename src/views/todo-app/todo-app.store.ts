import { Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { Importance, ITodo, ITaskDescription }            from '@/types/types';

@Module({ namespaced: true })
export default class TodoAppStore extends VuexModule {
  todos: Array<ITodo> = [];
  selectedImportance: Importance = Importance.NORMAL;
  identifier: number = 0;
  isInputVisible: boolean = false;

  @Mutation
  addTodo(taskDescription: ITaskDescription): void {
    this.todos.push({
      id: this.identifier,
      title: taskDescription.title,
      importance: taskDescription.importance,
      isDone: false,
    });
    this.identifier += 1;
  }

  @Mutation
  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  @Mutation
  toggleInputVisibility(): void {
    this.isInputVisible = !this.isInputVisible;
  }

  @Mutation
  setTaskImportance(importance: Importance): void {
    this.selectedImportance = importance;
  }

  @Mutation
  toggleTodo(id: number): void {
    const index = this.todos.findIndex(item => item.id === id);
    this.todos[index].isDone = !this.todos[index].isDone;
  }
}
