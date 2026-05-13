import { companies } from "@/data/companies";
import { countries } from "@/data/countries";
import { posts } from "@/data/posts";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const jitter = () => 200 + Math.random() * 600;

export async function fetchCountries() {
  await delay(jitter());
  return countries;
}

export async function fetchCompanies() {
  await delay(jitter());
  return companies;
}

export async function fetchPosts() {
  await delay(jitter());
  return posts;
}
