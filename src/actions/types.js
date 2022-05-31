/*
String constant that 
    indicates the type of action being performed.
*/
// authentication
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
export const VALIDATE_ACCOUNT = "VALIDATE_ACCOUNT";
export const LOGOUT = "LOGOUT";

// Deliveries
export const CREATE_DELIVERY = "CREATE_DELIVERY";
export const RETRIEVE_DELIVERIES = "RETRIEVE_DELIVERIES";
export const FILTERBYSTATUS = "FILTERBYSTATUS";
export const FILTERBYDATE = "FILTERBYDATE";
export const GET_RIDERS = "GET_RIDERS";
export const UPDATE_DELIVERY = "UPDATE_DELIVERY";
export const DELETE_DELIVERY = "DELETE_DELIVERY";

// Fleets
export const CREATE_FLEET = "CREATE_FLEET";
export const CREATE_FLEET_FAIL = "CREATE_FLEET_FAIL";
export const RETRIEVE_FLEETS = "RETRIEVE_FLEETS";
export const UPDATE_FLEET = "UPDATE_FLEET";
export const UPDATE_BANNER = "UPDATE_BANNER";
export const UPDATE_STATUS = "UPDATE_STATUS";
export const VEHILCLE_TYPE = "VEHILCLE_TYPE";
export const UPDATE_FLEET_FAIL = "UPDATE_FLEET_FAIL";

// Message
export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";
export const DELETE_ALL_DELIVERIES = "DELETE_ALL_DELIVERIES";

// onboarding
export const STORE_ONBOARD = "STORE_ONBOARD";
export const STORE_ONBOARD_FAIL = "STORE_ONBOARD_FAIL";
export const STAGE_1 = "STAGE_1";
export const STAGE_2 = "STAGE_2";
export const VERIFY_OTP = "VERIFY_OTP";
export const VERIFY_OTP_FAIL = "VERIFY_OTP_FAIL";

// Staffs and Agent
export const CREATE_AGENT = "CREATE_AGENT";
export const CREATE_AGENT_FAIL = "CREATE_AGENT_FAIL";
export const RETRIEVE_AGENTS = "RETRIEVE_AGENTS";
export const RETRIEVE_AGENT = "RETRIEVE_AGENT";
export const UPDATE_AGENT_STATUS = "UPDATE_AGENT_STATUS";
export const INVITE_MANAGER = "INVITE_MANAGER";
export const VERIFY_MANAGER_INVITE = "VERIFY_MANAGER_INVITE";
export const LIST_MANAGERS = "LIST_MANAGERS";

// Finance And Accounting
export const CREATE_INVOICE = "CREATE_INVOICE";
export const RETRIEVE_INVOICES = "RETRIEVE_INVOICES";
export const RETRIEVE_INVOICE = "RETRIEVE_INVOICE";
export const UPDATE_INVOICE = "UPDATE_INVOICE";
export const CREATE_PRICE = "CREATE_PRICE";
export const RETRIEVE_PRICES = "RETRIEVE_PRICES";
export const UPDATE_PRICE = "UPDATE_PRICE";
export const DELETE_PRICE = "DELETE_PRICE";


// Package Tracking
export const GET_PACKAGE_TRACKING = "GET_PACKAGE_TRACKING";