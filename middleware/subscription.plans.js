class Starter {
	constructor(
		check_diagnosis,
		repairs,
		tow_service,
		alternative_free_ride,
		unlimited_support,
		choose_a_specialist,
		parts_sales_and_delivery,
		help_a_friend
	) {
		this.check_diagnosis = true;
		this.repairs = 4;
		this.tow_service = 2;
		this.alternative_free_ride = false;
		this.unlimited_support = false;
		this.choose_a_specialist = false;
		this.parts_sales_and_delivery = true;
		this.help_a_friend = false;
	}
}

class Classic extends Starter {
	constructor(
		check_diagnosis,
		repairs,
		tow_service,
		alternative_free_ride,
		unlimited_support,
		choose_a_specialist,
		parts_sales_and_delivery,
		help_a_friend
	) {
		super(
			check_diagnosis,
			repairs,
			tow_service,
			alternative_free_ride,
			unlimited_support,
			choose_a_specialist,
			parts_sales_and_delivery,
			help_a_friend
		);

		this.check_diagnosis = true;
		this.repairs = 8;
		this.tow_service = 4;
		this.alternative_free_ride = false;
		this.unlimited_support = false;
		this.choose_a_specialist = false;
		this.parts_sales_and_delivery = true;
		this.help_a_friend = false;
	}
}

class Luxuriates extends Classic {
	constructor(
		check_diagnosis,
		repairs,
		tow_service,
		alternative_free_ride,
		unlimited_support,
		choose_a_specialist,
		parts_sales_and_delivery,
		help_a_friend
	) {
		super(
			check_diagnosis,
			repairs,
			tow_service,
			alternative_free_ride,
			unlimited_support,
			choose_a_specialist,
			parts_sales_and_delivery,
			help_a_friend
		);

		this.check_diagnosis = true;
		this.repairs = 1000;
		this.tow_service = 1000;
		this.alternative_free_ride = true;
		this.unlimited_support = true;
		this.choose_a_specialist = true;
		this.parts_sales_and_delivery = true;
		this.help_a_friend = true;
	}
}

const starter = new Starter();
const classic = new Classic();
const luxuriates = new Luxuriates();

module.exports = { starter, classic, luxuriates };
