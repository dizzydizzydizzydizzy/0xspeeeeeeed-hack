export class GenBase {
  static imageResponseOptions(optionsToOverrides?: any) {
    const RECT_SIZE = {
      width: 600,
      height: 600,
    };
    const WIDE_SIZE = {
      width: 829,
      height: 435,
    };
    const MULTIPLE = 1;

    return {
      width: WIDE_SIZE.width * MULTIPLE,
      height: WIDE_SIZE.height * MULTIPLE,
      // fonts: [
      //   { name: "RobotoRegular", data: robotoRegularData, weight: 400 },
      //   { name: "RobotoBold", data: robotoBoldData, weight: 700 },
      // ],
      ...optionsToOverrides,
    };
  }
}
