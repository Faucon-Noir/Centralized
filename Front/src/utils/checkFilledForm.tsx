//return true if all the properties of the object are defined
export default async function checkFilledForm(newObj: any) {
	//setup exceptions
	let exceptions = ['template', 'status'];
	//loop on all the properties
	for (let key in newObj) {
		//if the popertie is in the excpetion just skip
		if (exceptions.includes(key)) continue;
		//check if filled
		if (newObj[key] == '') return false;
	}
	return true;
}
