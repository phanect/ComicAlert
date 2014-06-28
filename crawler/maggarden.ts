/// <reference path="../lib/external/DefinitelyTyped/node/node.d.ts" />

class MagGardenMagazine extends Magazine {
	analyze() {
		li_tags = self.soup.find("div", id="comicList02").ul.find_all("li")

		for li_tag in li_tags:
			a = li_tag.find("a")

			if a["href"] == self.url or not self.url in a["href"]:
				continue

			print(a["href"])

			if li_tag.img:
				print("http://comic.mag-garden.co.jp/%s" % li_tag.img["src"])

			print()
	}
}