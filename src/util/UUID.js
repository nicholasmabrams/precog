export const UUID = function UUID(length) {
	class _UUID {
		constructor(
			UUIDlength,
			charset = { 
			  chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 
			  nums: '1234567890' 
			}
		) {
			this.result = '';
			this.length = UUIDlength;
			this.fullCharset = (charset.nums + charset.chars + charset.nums).split('');
			this.prevUUIDs = [];
			this.generate(UUIDlength);
		}
		
		clear(){
			this.prevUUIDs = [];
		}

		rand(limit) {
			return Math.floor(Math.random() * limit);
		}

		randomCase(char) {
			const caseMethodNames = ["toLowerCase", "toUpperCase"],
				  dynamicCaseMethodName = caseMethodNames[
					  	this.rand(caseMethodNames.length)
			];
			
			return char[dynamicCaseMethodName]();
		}
		
		getRandomGUIDChar(){
			return this.fullCharset[this.rand(this.fullCharset.length)];
		}

		generate(length) {
			while (this.result.length < length) {
				this.result += this.randomCase(this.getRandomGUIDChar());
			}
		}
		
		regenerate(){
			this.result = '';
			this.generate(this.length);
			return this.result;
		}

		output() {
			const allPrevUUIDs = this.prevUUIDs.join(''),
			      resultUUID = this.result;
			
				if (allPrevUUIDs.indexOf(resultUUID) > -1){
					this.regenerate();
					return this.output();
				}
			
			this.prevUUIDs.push(this.result);
			
			return this.result;	
		}
	}
	
	return new _UUID(length);
};

export default UUID;