import client from "./client";

export const getFeaturedPosts = async () => {
	try {
		const { data } = await client.get(`/post/featured-posts`);
		return data;
	} catch (error) {
		if (error?.response) {
			return error.response.data;
		}
		return { success: false, message: error.message || error };
	}
};

export const getLatestPosts = async (limit, pageNo) => {
	try {
		const { data } = await client.get(`/post/get-posts?pageNo=${pageNo}&limit=${limit}`);
		return data;
	} catch (error) {
		if (error?.response) {
			return error.response.data;
		}
		return { success: false, message: error.message || error };
	}
};

export const getPost = async (slug) => {
	try {
		const { data } = await client.get(`/post/single/${slug}`);
		return data;
	} catch (error) {
		if (error?.response) {
			return error.response.data;
		}
		return { success: false, message: error.message || error };
	}
};

export const getRelatedPosts = async (postId) => {
	try {
		const { data } = await client.get(`/post/related-posts/${postId}`);
		return data;
	} catch (error) {
		if (error?.response) {
			return error.response.data;
		}
		return { success: false, message: error.message || error };
	}
};

export const searchPosts = async (query) => {
	try {
		const { data } = await client.get(`/post/search?query=${query}`);
		return data;
	} catch (error) {
		if (error?.response) {
			return error.response.data;
		}
		return { success: false, message: error.message || error };
	}
};
