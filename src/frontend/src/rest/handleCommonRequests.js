// Rest
import RestPoints from 'rest/Init';
import RestCom from 'rest/Rest';

import store from 'Store';
import { setAllSkills, setAllCategories } from 'actions';

export async function updateAllSkills() {
  const Rest = new RestCom(RestPoints.getSkills);
  try {
    const response = await Rest.get();
    const { allSkills, categories } = response;
    store.dispatch(setAllSkills(allSkills));
    store.dispatch(setAllCategories(categories));
  } catch (e) {
    console.log(e);
  }
}

export const placeholder = 'placeholder';
