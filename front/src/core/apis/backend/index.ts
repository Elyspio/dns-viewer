import { injectable } from "inversify";
import axios from "axios";
import { DnsApi } from "./generated";

const instance = axios.create({
	withCredentials: true,
});

@injectable()
export class BackendApiClient {
	public readonly clients = {
		dns: new DnsApi(undefined, window.config.endpoints.core, instance),
	};
}
