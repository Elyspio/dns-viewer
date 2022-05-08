import { inject, injectable } from "inversify";
import { BackendApiClient } from "../apis/backend";
import { DnsEntry } from "../apis/backend/generated";
import { BaseService } from "./base.service";

@injectable()
export class DnsService extends BaseService {
	@inject(BackendApiClient)
	private backendApiClient!: BackendApiClient;

	public async list(): Promise<DnsEntry[]> {
		return await this.backendApiClient.clients.dns.getAll().then(this.unWrapAxios);
	}

	public async add(host: string, ip: string): Promise<DnsEntry> {
		return await this.backendApiClient.clients.dns.add({ ip, host }).then(this.unWrapAxios);
	}

	public async delete(host: string) {
		await this.backendApiClient.clients.dns._delete(host);
	}
}
