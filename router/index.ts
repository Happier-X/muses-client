import { router, useStore } from "@/cool";

const ignoreToken = [
	"/pages/auth/index",
	"/pages/home/index",
	"/pages/my/index",
	"/pages/music/index",
	"/pages/music/songs/index",
	"/pages/music/albums/index",
	"/pages/music/artists/index",
	"/pages/music/playlists/index",
	"/pages/music/likes/index",
	"/pages/music/recentlyPlayed/index"
];

router.beforeEach((to, next) => {
	const { user } = useStore();

	if (
		ignoreToken.some((e) => to.path.includes(e)) ||
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
