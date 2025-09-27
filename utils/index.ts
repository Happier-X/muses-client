import { storage, isNull } from "@/cool";
import { useUi } from "@/uni_modules/cool-ui";

const ui = useUi();

export const getServiceUrl = (): string | null => {
	let serviceUrl = storage.get("serviceUrl") as string | null ;
	if (isNull(serviceUrl)) {
		ui.showToast({
			type: "error",
			message: "服务地址未配置"
		});
		return null;
	} else {
		return serviceUrl;
	}
};
