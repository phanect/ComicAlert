/*
 * Geddy JavaScript Web development framework
 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

var Main = function() {
	this.index = function(req, resp, params) {
		var self = this;
		var comics = new Array();

		geddy.model.Episode.all({hasRead: false}, {sort: {publishedAt: "desc"}}, function(err, episodes) {
			if (err) {
				throw err;
			}

			var respondWithEachComics = function(episodes, count) {
				geddy.model.Comic.first({
					id : episodes[count].comicId
				}, function(err, comic) {
					if (err) {
						throw err;
					}

					comics[count] = comic;

					if (count + 1 < episodes.length) {
						respondWithEachComics(episodes, count + 1);
					} else {
						self.respond({episodes: episodes, comics: comics},
							{
								format: "html",
								template: "app/views/main/index"
							}
						);
					}
				});
			};

			if (episodes.length > 0) {
				respondWithEachComics(episodes, 0);
			} else {
				console.log("No Episodes"); // TODO
			}
		});
	};
};

exports.Main = Main;

