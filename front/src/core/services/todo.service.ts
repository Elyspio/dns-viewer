import { inject, injectable } from "inversify";
import { BackendApiClient } from "../apis/backend";
import { Todo } from "../apis/backend/generated";
import { BaseService } from "./base.service";

interface ITodoServiceSub {
	get: () => Promise<Todo[]>;
	add: (label: string) => Promise<Todo>;
	remove: (id: Todo["id"]) => Promise<void>;
	check: (id: Todo["id"]) => Promise<Todo>;
}

@injectable()
export class TodoService extends BaseService {
	@inject(BackendApiClient)
	private backendApiClient!: BackendApiClient;

	public default: ITodoServiceSub = {
		get: async () => {
			return await this.backendApiClient.clients.todo.getAll().then(this.unWrapAxios);
		},
		add: async (label: string) => {
			return await this.backendApiClient.clients.todo.add(label).then(this.unWrapAxios);
		},
		check: async (id: Todo["id"]) => {
			return await this.backendApiClient.clients.todo.check(id).then(this.unWrapAxios);
		},
		remove: async (id: Todo["id"]) => {
			await this.backendApiClient.clients.todo._delete(id);
		},
	};

	public user: ITodoServiceSub = {
		get: async () => {
			return await this.backendApiClient.clients.todo.getAllForUser().then(this.unWrapAxios);
		},
		add: async (label: string) => {
			return await this.backendApiClient.clients.todo.addForUser(label).then(this.unWrapAxios);
		},
		check: async (id: Todo["id"]) => {
			return await this.backendApiClient.clients.todo.checkForUser(id).then(this.unWrapAxios);
		},
		remove: async (id: Todo["id"]) => {
			await this.backendApiClient.clients.todo.deleteForUser(id);
		},
	};
}
