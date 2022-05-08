import { injectable } from "inversify";
import axios from "axios";
import { TodoApi } from "./generated";

const instance = axios.create({
	withCredentials: true,
});

@injectable()
export class BackendApiClient {
	public readonly clients = {
		todo: new TodoApi(undefined, window.config.endpoints.core, instance),
	};
}
