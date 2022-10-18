import axios from "axios";

export const BASE_WP_URL = process.env.BASE_WP_URL;
export const wp_json_url = BASE_WP_URL + '/wp-json/wp/v2';

let dynamicRoutes = () => {
	const routes = axios
		.get(wp_json_url + "/posts?page=1&per_page=20")
		.then(res => {
			return res.data.map(post => `/blog/${post.slug}`)
		})
	console.log(routes)
	return routes
}

export default {
	mode: "universal",
	/*
	 ** Headers of the page
	 */
	head: {
		title: process.env.npm_package_name || "",
		meta: [{
				charset: "utf-8"
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{
				hid: "description",
				name: "description",
				content: process.env.npm_package_description || ""
			}
		],
		link: [{
				rel: "icon",
				type: "image/x-icon",
				href: "/favicon.ico"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css?family=Alata|Open+Sans&display=swap"
			}
		]
	},
	/*
	 ** Customize the progress-bar color
	 */
	loading: {
		color: "#fff"
	},
	/*
	 ** Global CSS
	 */
	css: ["~/assets/mixins.scss"],
	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [
		"~/plugins/posts.server.js",
		"~/plugins/tags.server.js",
		"~/plugins/dateformat.js"
	],
	generate: {
		routes: dynamicRoutes
	},
	/*
	 ** Nuxt.js dev-modules
	 */
	buildModules: [],
	/*
	 ** Build configuration
	 */
	build: {
		/*
		 ** You can extend webpack config here
		 */
		extend(config, ctx) {}
	}
}
