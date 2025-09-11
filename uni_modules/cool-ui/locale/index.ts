import { appendLocale } from "@/locale";

import zhcn from "./zh-cn.json";
import en from "./en.json";
import zhtw from "./zh-tw.json";
import es from "./es.json";
import fr from "./fr.json";
import ko from "./ko.json";
import ja from "./ja.json";

setTimeout(() => {
	appendLocale("zh-cn", zhcn);
	appendLocale("en", en);
	appendLocale("zh-tw", zhtw);
	appendLocale("es", es);
	appendLocale("fr", fr);
	appendLocale("ko", ko);
	appendLocale("ja", ja);
}, 0);
