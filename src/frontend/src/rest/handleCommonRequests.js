// Rest
import RestPoints from 'rest/Init';
import RestCom from 'rest/Rest';

import store from 'Store';
import {
  setAllSkills, setAllCategories, setOwnProfile, setError,
} from 'actions';

export async function updateAllSkills() {
  const Rest = new RestCom(RestPoints.getSkills);
  try {
    const { allSkills, categories } = await Rest.get();
    store.dispatch(setAllSkills(allSkills));
    store.dispatch(setAllCategories(categories));
  } catch (e) {
    console.log(e);
  }
}

export async function updateOwnProfile(apiUrl, data) {
  const Rest = new RestCom(apiUrl, data);
  try {
    const newProfile = await Rest.post();
    store.dispatch(setOwnProfile(newProfile));
  } catch (e) {
    store.dispatch(setError(e.message));
  }
}

export const placeholder = 'placeholder';
