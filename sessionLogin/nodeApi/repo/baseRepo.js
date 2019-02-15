class BaseRepository {
	constructor(model){
		if(!model) throw new Error ('Model is Required');
		this.model = model;
	}

	add(data,callback){
		this.model.create(data,callback);
	}

	get(option,callback){
		this.model.find(option,'-__v -password',callback);
	}

	getById(id,callback){
		this.model.findById(id,callback);
	}

	getByParams(option,callback){
		this.model.findOne(option,callback);
	}

	deleteData(id,callback){
		this.model.remove(id,callback);
	}

	updateData(id,data,callback){
		this.model.findOneAndUpdate(id,data,callback);
	}

}

module.exports = (model) =>{
	return new BaseRepository(model);
}