import { router, useStore } from "@/cool";

const ignoreToken = [
	"/pages/auth/index",
	"/pages/home/index",
	"/pages/my/index",
	"/pages/musicLibrary/index"
];

router.beforeEach((to, next) => {
	const { user } = useStore();

	if (
		ignoreToken.includes(to.path) ||
		to.path.startsWith("/pages/demo") ||
		to.path.startsWith("/pages/template")
	) {
		next();
	} else {
		if (!user.isNull()) {
			next();
		} else {
			router.login();
		}
	}
});
