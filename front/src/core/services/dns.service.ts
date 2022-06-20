import { inject, injectable } from "inversify";
import { BackendApiClient } from "../apis/backend";
import { DnsEntry } from "../apis/backend/generated";
import { BaseService } from "./base.service";

@injectable()
export class DnsService extends BaseService {
	@inject(BackendApiClient)
	private backendApiClient!: BackendApiClient;

	/**
	 * Get all DNS entries
	 */
	public async list(): Promise<DnsEntry[]> {
		return await this.backendApiClient.clients.dns.getAll().then(this.unWrapAxios);
	}

	/**
	 * Add a DNS entry
	 */
	public async add(host: string, ip: string): Promise<DnsEntry> {
		return await this.backendApiClient.clients.dns.add({ ip, host }).then(this.unWrapAxios);
	}

	/**
	 * Delete a DNS entry from its host
	 * @param host
	 */
	public async delete(host: string) {
		await this.backendApiClient.clients.dns._delete(host);
	}

	/**
	 * If an IP is a valid IPV4 address
	 */
	public isIpValid(ip: string): boolean {
		const member = "(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
		return new RegExp(`^${member}.${member}.${member}.${member}$`).test(ip);
	}
}
