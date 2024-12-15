import { memo, Suspense } from 'react';
import dynamic from 'next/dynamic';

const IconDictionary: any = {
  Language: dynamic(() => import('public/images/icons/Language.svg')),
  AlarmClockFill: dynamic(
    () => import('public/images/icons/alarm-clock-fill.svg'),
  ),
  AlarmClock: dynamic(() => import('public/images/icons/alarm-clock.svg')),
  ArrowCapsulepath: dynamic(
    () => import('public/images/icons/arrow-capsulepath.svg'),
  ),
  ArrowCirclepath: dynamic(
    () => import('public/images/icons/arrow-circlepath.svg'),
  ),
  ArrowDownLeftFill: dynamic(
    () => import('public/images/icons/arrow-down-left-fill.svg'),
  ),
  ArrowDownLeft: dynamic(
    () => import('public/images/icons/arrow-down-left.svg'),
  ),
  ArrowDownLine: dynamic(
    () => import('public/images/icons/arrow-down-line.svg'),
  ),
  ArrowDown: dynamic(() => import('public/images/icons/arrow-down.svg')),
  ArrowLeft: dynamic(() => import('public/images/icons/arrow-left.svg')),
  ArrowRightFill: dynamic(
    () => import('public/images/icons/arrow-right-fill.svg'),
  ),
  ArrowRightFromBlueDot: dynamic(
    () => import('public/images/icons/arrow-right-from-blue-dot.svg'),
  ),
  ArrowRightFromLine: dynamic(
    () => import('public/images/icons/arrow-right-from-line.svg'),
  ),
  ArrowRight: dynamic(() => import('public/images/icons/arrow-right.svg')),
  ArrowTopRight1: dynamic(
    () => import('public/images/icons/arrow-top-right-1.svg'),
  ),
  ArrowTopRightQuestionFill: dynamic(
    () => import('public/images/icons/arrow-top-right-question-fill.svg'),
  ),
  ArrowTopRightQuestion: dynamic(
    () => import('public/images/icons/arrow-top-right-question.svg'),
  ),
  ArrowTopRight: dynamic(
    () => import('public/images/icons/arrow-top-right.svg'),
  ),
  ArrowTwoCirclepathHorizontal: dynamic(
    () => import('public/images/icons/arrow-two-circlepath-horizontal.svg'),
  ),
  ArrowTwoCirclepathVetical: dynamic(
    () => import('public/images/icons/arrow-two-circlepath-vetical.svg'),
  ),
  ArrowTwoRectanglepathHorizontal: dynamic(
    () => import('public/images/icons/arrow-two-rectanglepath-horizontal.svg'),
  ),
  ArrowUpArrowDownSmall: dynamic(
    () => import('public/images/icons/arrow-up-arrow-down-small.svg'),
  ),
  ArrowUpArrowDown: dynamic(
    () => import('public/images/icons/arrow-up-arrow-down.svg'),
  ),
  ArrowUpRight: dynamic(() => import('public/images/icons/arrow-up-right.svg')),
  ArrowUp: dynamic(() => import('public/images/icons/arrow-up.svg')),
  ArrowUpwardTrend: dynamic(
    () => import('public/images/icons/arrow-upward-trend.svg'),
  ),
  AttachFile: dynamic(() => import('public/images/icons/attach-file.svg')),
  BanknoteFill: dynamic(() => import('public/images/icons/banknote-fill.svg')),
  BanknoteTwoFill: dynamic(
    () => import('public/images/icons/banknote-two-fill.svg'),
  ),
  BanknoteTwo: dynamic(() => import('public/images/icons/banknote-two.svg')),
  Banknote: dynamic(() => import('public/images/icons/banknote.svg')),
  BatteryExclamation: dynamic(
    () => import('public/images/icons/battery-exclamation.svg'),
  ),
  Battery: dynamic(() => import('public/images/icons/battery.svg')),
  BazzarpayLogo: dynamic(
    () => import('public/images/icons/bazzarpay-logo.svg'),
  ),
  BellDotFill: dynamic(() => import('public/images/icons/bell-dot-fill.svg')),
  BellFill: dynamic(() => import('public/images/icons/bell-fill.svg')),
  Bell: dynamic(() => import('public/images/icons/bell.svg')),
  BookmarkFill: dynamic(() => import('public/images/icons/bookmark-fill.svg')),
  Bookmark: dynamic(() => import('public/images/icons/bookmark.svg')),
  BoxCheck: dynamic(() => import('public/images/icons/box-check.svg')),
  BoxFill: dynamic(() => import('public/images/icons/box-fill.svg')),
  Box: dynamic(() => import('public/images/icons/box.svg')),
  BriefcaseFill: dynamic(
    () => import('public/images/icons/briefcase-fill.svg'),
  ),
  Briefcase: dynamic(() => import('public/images/icons/briefcase.svg')),
  BuildingFill: dynamic(() => import('public/images/icons/building-fill.svg')),
  Building: dynamic(() => import('public/images/icons/building.svg')),
  CalendarFill: dynamic(() => import('public/images/icons/calendar-fill.svg')),
  Calendar: dynamic(() => import('public/images/icons/calendar.svg')),
  CallDialogBox: dynamic(
    () => import('public/images/icons/call-dialog-box.svg'),
  ),
  CallLeftSlash: dynamic(
    () => import('public/images/icons/call-left-slash.svg'),
  ),
  CallLeft: dynamic(() => import('public/images/icons/call-left.svg')),
  CallRigh: dynamic(() => import('public/images/icons/call-righ.svg')),
  CallRightSlash: dynamic(
    () => import('public/images/icons/call-right-slash.svg'),
  ),
  CameraFill: dynamic(() => import('public/images/icons/camera-fill.svg')),
  CameraPlus: dynamic(() => import('public/images/icons/camera-plus.svg')),
  Camera: dynamic(() => import('public/images/icons/camera.svg')),
  CarClockFill: dynamic(() => import('public/images/icons/car-clock-fill.svg')),
  CarClock: dynamic(() => import('public/images/icons/car-clock.svg')),
  CarFill: dynamic(() => import('public/images/icons/car-fill.svg')),
  CarSlashFill: dynamic(() => import('public/images/icons/car-slash-fill.svg')),
  CarSlash: dynamic(() => import('public/images/icons/car-slash.svg')),
  CarSpark: dynamic(() => import('public/images/icons/car-spark.svg')),
  Car: dynamic(() => import('public/images/icons/car.svg')),
  CardFill: dynamic(() => import('public/images/icons/card-fill.svg')),
  CardLeftArrowFill: dynamic(
    () => import('public/images/icons/card-left-arrow-fill.svg'),
  ),
  CardLeftArrow: dynamic(
    () => import('public/images/icons/card-left-arrow.svg'),
  ),
  CardPlusFill: dynamic(() => import('public/images/icons/card-plus-fill.svg')),
  CardPlus: dynamic(() => import('public/images/icons/card-plus.svg')),
  CardRightArrowFill: dynamic(
    () => import('public/images/icons/card-right-arrow-fill.svg'),
  ),
  CardRightArrow: dynamic(
    () => import('public/images/icons/card-right-arrow.svg'),
  ),
  CardSparkFill: dynamic(
    () => import('public/images/icons/card-spark-fill.svg'),
  ),
  CardSpark: dynamic(() => import('public/images/icons/card-spark.svg')),
  CardTimeFill: dynamic(() => import('public/images/icons/card-time-fill.svg')),
  CardTime: dynamic(() => import('public/images/icons/card-time.svg')),
  Card: dynamic(() => import('public/images/icons/card.svg')),
  CheckFill: dynamic(() => import('public/images/icons/check-fill.svg')),
  Check: dynamic(() => import('public/images/icons/check.svg')),
  ChevronDownFill: dynamic(
    () => import('public/images/icons/chevron-down-fill.svg'),
  ),
  ChevronDown: dynamic(() => import('public/images/icons/chevron-down.svg')),
  ChevronLeftFill: dynamic(
    () => import('public/images/icons/chevron-left-fill.svg'),
  ),
  ChevronLeft: dynamic(() => import('public/images/icons/chevron-left.svg')),
  ChevronRightFill: dynamic(
    () => import('public/images/icons/chevron-right-fill.svg'),
  ),
  ChevronRight: dynamic(() => import('public/images/icons/chevron-right.svg')),
  ChevronUpFill: dynamic(
    () => import('public/images/icons/chevron-up-fill.svg'),
  ),
  ChevronUp: dynamic(() => import('public/images/icons/chevron-up.svg')),
  CircleCheckFill: dynamic(
    () => import('public/images/icons/circle-check-fill.svg'),
  ),
  CircleCheckSmallFill: dynamic(
    () => import('public/images/icons/circle-check-small-fill.svg'),
  ),
  CircleCheckSmall: dynamic(
    () => import('public/images/icons/circle-check-small.svg'),
  ),
  CircleCheck: dynamic(() => import('public/images/icons/circle-check.svg')),
  CircleCrossFill: dynamic(
    () => import('public/images/icons/circle-cross-fill.svg'),
  ),
  CircleCross: dynamic(() => import('public/images/icons/circle-cross.svg')),
  CircleExclamationFill: dynamic(
    () => import('public/images/icons/circle-exclamation-fill.svg'),
  ),
  CircleExclamation: dynamic(
    () => import('public/images/icons/circle-exclamation.svg'),
  ),
  CircleInformationFill: dynamic(
    () => import('public/images/icons/circle-information-fill.svg'),
  ),
  CircleInformation: dynamic(
    () => import('public/images/icons/circle-information.svg'),
  ),
  CircleMinusFill: dynamic(
    () => import('public/images/icons/circle-minus-fill.svg'),
  ),
  CircleMinus: dynamic(() => import('public/images/icons/circle-minus.svg')),
  CircleMoreFill: dynamic(
    () => import('public/images/icons/circle-more-fill.svg'),
  ),
  CirclePersonFill1: dynamic(
    () => import('public/images/icons/circle-person-fill-1.svg'),
  ),
  CirclePersonFill: dynamic(
    () => import('public/images/icons/circle-person-fill.svg'),
  ),
  CirclePerson: dynamic(() => import('public/images/icons/circle-person.svg')),
  CirclePlusFill: dynamic(
    () => import('public/images/icons/circle-plus-fill.svg'),
  ),
  CirclePlus: dynamic(() => import('public/images/icons/circle-plus.svg')),
  CircleQuestionFill: dynamic(
    () => import('public/images/icons/circle-question-fill.svg'),
  ),
  CircleStarFill: dynamic(
    () => import('public/images/icons/circle-star-fill.svg'),
  ),
  CircleStar: dynamic(() => import('public/images/icons/circle-star.svg')),
  CircleThunderFill: dynamic(
    () => import('public/images/icons/circle-thunder-fill.svg'),
  ),
  CircleThunder: dynamic(
    () => import('public/images/icons/circle-thunder.svg'),
  ),
  ClipboardClockFill: dynamic(
    () => import('public/images/icons/clipboard-clock-fill.svg'),
  ),
  ClipboardClock: dynamic(
    () => import('public/images/icons/clipboard-clock.svg'),
  ),
  ClipsTogether: dynamic(
    () => import('public/images/icons/clips-together.svg'),
  ),
  ClockArrowCirclepath: dynamic(
    () => import('public/images/icons/clock-arrow-circlepath.svg'),
  ),
  ClockDashed: dynamic(() => import('public/images/icons/clock-dashed.svg')),
  ClockFill: dynamic(() => import('public/images/icons/clock-fill.svg')),
  ClockSmallFill: dynamic(
    () => import('public/images/icons/clock-small-fill.svg'),
  ),
  ClockSmall: dynamic(() => import('public/images/icons/clock-small.svg')),
  Clock: dynamic(() => import('public/images/icons/clock.svg')),
  CopyFill: dynamic(() => import('public/images/icons/copy-fill.svg')),
  Copy: dynamic(() => import('public/images/icons/copy.svg')),
  CouponFill: dynamic(() => import('public/images/icons/coupon-fill.svg')),
  CouponPuchedFill: dynamic(
    () => import('public/images/icons/coupon-puched-fill.svg'),
  ),
  CouponPuched: dynamic(() => import('public/images/icons/coupon-puched.svg')),
  Coupon: dynamic(() => import('public/images/icons/coupon.svg')),
  CrossFill: dynamic(() => import('public/images/icons/cross-fill.svg')),
  Cross: dynamic(() => import('public/images/icons/cross.svg')),
  DefaultFill: dynamic(() => import('public/images/icons/default-fill.svg')),
  Default: dynamic(() => import('public/images/icons/default.svg')),
  DeleteLeftFill: dynamic(
    () => import('public/images/icons/delete-left-fill.svg'),
  ),
  DeleteLeft: dynamic(() => import('public/images/icons/delete-left.svg')),
  DialogBoxTextFill: dynamic(
    () => import('public/images/icons/dialog-box-text-fill.svg'),
  ),
  DialogBoxText: dynamic(
    () => import('public/images/icons/dialog-box-text.svg'),
  ),
  DialogboxQuestion: dynamic(
    () => import('public/images/icons/dialogbox-question.svg'),
  ),
  DiamondArrowTurnRight1: dynamic(
    () => import('public/images/icons/diamond-arrow-turn-right-1.svg'),
  ),
  DiamondArrowTurnRight: dynamic(
    () => import('public/images/icons/diamond-arrow-turn-right.svg'),
  ),
  DotFill: dynamic(() => import('public/images/icons/dot-fill.svg')),
  DoubleCheck: dynamic(() => import('public/images/icons/double-check.svg')),
  EarSlash: dynamic(() => import('public/images/icons/ear-slash.svg')),
  EnvelopeFill: dynamic(() => import('public/images/icons/envelope-fill.svg')),
  EnvelopeOpenFill: dynamic(
    () => import('public/images/icons/envelope-open-fill.svg'),
  ),
  EnvelopeOpen: dynamic(() => import('public/images/icons/envelope-open.svg')),
  Envelope: dynamic(() => import('public/images/icons/envelope.svg')),
  ExclamationFill: dynamic(
    () => import('public/images/icons/exclamation-fill.svg'),
  ),
  Exclamation: dynamic(() => import('public/images/icons/exclamation.svg')),
  EyeFill: dynamic(() => import('public/images/icons/eye-fill.svg')),
  EyeSlashFill: dynamic(() => import('public/images/icons/eye-slash-fill.svg')),
  EyeSlashStripes: dynamic(
    () => import('public/images/icons/eye-slash-stripes.svg'),
  ),
  EyeSlash: dynamic(() => import('public/images/icons/eye-slash.svg')),
  Eye: dynamic(() => import('public/images/icons/eye.svg')),
  FaceSadFill: dynamic(() => import('public/images/icons/face-sad-fill.svg')),
  FaceSad: dynamic(() => import('public/images/icons/face-sad.svg')),
  FaceSmileFill: dynamic(
    () => import('public/images/icons/face-smile-fill.svg'),
  ),
  FaceSmile: dynamic(() => import('public/images/icons/face-smile.svg')),
  FingerLeftFill: dynamic(
    () => import('public/images/icons/finger-left-fill.svg'),
  ),
  FingerSwipeVertical: dynamic(
    () => import('public/images/icons/finger-swipe-vertical.svg'),
  ),
  FingerTouch: dynamic(() => import('public/images/icons/finger-touch.svg')),
  FingerUpFill: dynamic(() => import('public/images/icons/finger-up-fill.svg')),
  FireFill: dynamic(() => import('public/images/icons/fire-fill.svg')),
  Fire: dynamic(() => import('public/images/icons/fire.svg')),
  FlagFill: dynamic(() => import('public/images/icons/flag-fill.svg')),
  Flag: dynamic(() => import('public/images/icons/flag.svg')),
  GarageLogo: dynamic(() => import('public/images/icons/garage-logo.svg')),
  GasStationFill: dynamic(
    () => import('public/images/icons/gas-station-fill.svg'),
  ),
  GasStation: dynamic(() => import('public/images/icons/gas-station.svg')),
  GearFill: dynamic(() => import('public/images/icons/gear-fill.svg')),
  Gear: dynamic(() => import('public/images/icons/gear.svg')),
  Gift: dynamic(() => import('public/images/icons/gift.svg')),
  GraduationCapFill: dynamic(
    () => import('public/images/icons/graduation-cap-fill.svg'),
  ),
  GraduationCap: dynamic(
    () => import('public/images/icons/graduation-cap.svg'),
  ),
  HeadphoneFill: dynamic(
    () => import('public/images/icons/headphone-fill.svg'),
  ),
  Headphone: dynamic(() => import('public/images/icons/headphone.svg')),
  HeartBrokenFill: dynamic(
    () => import('public/images/icons/heart-broken-fill.svg'),
  ),
  HeartFill: dynamic(() => import('public/images/icons/heart-fill.svg')),
  Heart: dynamic(() => import('public/images/icons/heart.svg')),
  HelmetsFillRtl: dynamic(
    () => import('public/images/icons/helmets-fill-rtl.svg'),
  ),
  HelmetsFill: dynamic(() => import('public/images/icons/helmets-fill.svg')),
  HelmetsRtl: dynamic(() => import('public/images/icons/helmets-rtl.svg')),
  Helmets: dynamic(() => import('public/images/icons/helmets.svg')),
  HomeFill: dynamic(() => import('public/images/icons/home-fill.svg')),
  Home: dynamic(() => import('public/images/icons/home.svg')),
  HourglassFill: dynamic(
    () => import('public/images/icons/hourglass-fill.svg'),
  ),
  Hourglass: dynamic(() => import('public/images/icons/hourglass.svg')),
  ImageFill: dynamic(() => import('public/images/icons/image-fill.svg')),
  ImageTwoFill: dynamic(() => import('public/images/icons/image-two-fill.svg')),
  ImageTwo: dynamic(() => import('public/images/icons/image-two.svg')),
  Image: dynamic(() => import('public/images/icons/image.svg')),
  InfoFill: dynamic(() => import('public/images/icons/info-fill.svg')),
  Info: dynamic(() => import('public/images/icons/info.svg')),
  KeyboardFill: dynamic(() => import('public/images/icons/keyboard-fill.svg')),
  Keyboard: dynamic(() => import('public/images/icons/keyboard.svg')),
  LampSparkFill: dynamic(
    () => import('public/images/icons/lamp-spark-fill.svg'),
  ),
  LineThreeHorizontalDecrease: dynamic(
    () => import('public/images/icons/line-three-horizontal-decrease.svg'),
  ),
  LineThree: dynamic(() => import('public/images/icons/line-three.svg')),
  ListBullet: dynamic(() => import('public/images/icons/list-bullet.svg')),
  LoadingSpinner: dynamic(
    () => import('public/images/icons/loading-spinner.svg'),
  ),
  Loading: dynamic(() => import('public/images/icons/loading.svg')),
  LocationLeft: dynamic(() => import('public/images/icons/location-left.svg')),
  LocationUp: dynamic(() => import('public/images/icons/location-up.svg')),
  LockFill: dynamic(() => import('public/images/icons/lock-fill.svg')),
  LockSmallFill: dynamic(
    () => import('public/images/icons/lock-small-fill.svg'),
  ),
  LockSmall: dynamic(() => import('public/images/icons/lock-small.svg')),
  Lock: dynamic(() => import('public/images/icons/lock.svg')),
  MagnifierFill: dynamic(
    () => import('public/images/icons/magnifier-fill.svg'),
  ),
  Magnifier: dynamic(() => import('public/images/icons/magnifier.svg')),
  MapFill: dynamic(() => import('public/images/icons/map-fill.svg')),
  Map: dynamic(() => import('public/images/icons/map.svg')),
  Medal1: dynamic(() => import('public/images/icons/medal-1.svg')),
  MedalFill1: dynamic(() => import('public/images/icons/medal-fill-1.svg')),
  MedalFill: dynamic(() => import('public/images/icons/medal-fill.svg')),
  Medal: dynamic(() => import('public/images/icons/medal.svg')),
  MicrophoneFill: dynamic(
    () => import('public/images/icons/microphone-fill.svg'),
  ),
  MicrophoneSlashFill: dynamic(
    () => import('public/images/icons/microphone-slash-fill.svg'),
  ),
  MicrophoneSlash: dynamic(
    () => import('public/images/icons/microphone-slash.svg'),
  ),
  MicrophoneSparkFill: dynamic(
    () => import('public/images/icons/microphone-spark-fill.svg'),
  ),
  MicrophoneSpark: dynamic(
    () => import('public/images/icons/microphone-spark.svg'),
  ),
  Microphone: dynamic(() => import('public/images/icons/microphone.svg')),
  MinusFill: dynamic(() => import('public/images/icons/minus-fill.svg')),
  Minus: dynamic(() => import('public/images/icons/minus.svg')),
  MoonFill: dynamic(() => import('public/images/icons/moon-fill.svg')),
  Moon: dynamic(() => import('public/images/icons/moon.svg')),
  MoreHorizontalFill: dynamic(
    () => import('public/images/icons/more-horizontal-fill.svg'),
  ),
  MoreHorizontal: dynamic(
    () => import('public/images/icons/more-horizontal.svg'),
  ),
  MoreVerticalFill: dynamic(
    () => import('public/images/icons/more-vertical-fill.svg'),
  ),
  MoreVertical: dynamic(() => import('public/images/icons/more-vertical.svg')),
  Motorcycle: dynamic(() => import('public/images/icons/motorcycle.svg')),
  Pause: dynamic(() => import('public/images/icons/pause.svg')),
  PencilLineFill: dynamic(
    () => import('public/images/icons/pencil-line-fill.svg'),
  ),
  PencilLine: dynamic(() => import('public/images/icons/pencil-line.svg')),
  Person1: dynamic(() => import('public/images/icons/person-1.svg')),
  PersonFill1: dynamic(() => import('public/images/icons/person-fill-1.svg')),
  PersonFill: dynamic(() => import('public/images/icons/person-fill.svg')),
  PersonInWheelchair: dynamic(
    () => import('public/images/icons/person-in-wheelchair.svg'),
  ),
  PersonMinusFill: dynamic(
    () => import('public/images/icons/person-minus-fill.svg'),
  ),
  PersonMinus: dynamic(() => import('public/images/icons/person-minus.svg')),
  PersonPlusFill: dynamic(
    () => import('public/images/icons/person-plus-fill.svg'),
  ),
  PersonPlus: dynamic(() => import('public/images/icons/person-plus.svg')),
  PersonTwoFill: dynamic(
    () => import('public/images/icons/person-two-fill.svg'),
  ),
  PersonTwo: dynamic(() => import('public/images/icons/person-two.svg')),
  PersonWaveFill: dynamic(
    () => import('public/images/icons/person-wave-fill.svg'),
  ),
  PersonWave: dynamic(() => import('public/images/icons/person-wave.svg')),
  Person: dynamic(() => import('public/images/icons/person.svg')),
  PhoneFill: dynamic(() => import('public/images/icons/phone-fill.svg')),
  PhoneVibrateFill: dynamic(
    () => import('public/images/icons/phone-vibrate-fill.svg'),
  ),
  PhoneVibrate: dynamic(() => import('public/images/icons/phone-vibrate.svg')),
  Phone: dynamic(() => import('public/images/icons/phone.svg')),
  PinCircleFill: dynamic(
    () => import('public/images/icons/pin-circle-fill.svg'),
  ),
  PinCircle: dynamic(() => import('public/images/icons/pin-circle.svg')),
  PinCrossFill: dynamic(() => import('public/images/icons/pin-cross-fill.svg')),
  PinCross: dynamic(() => import('public/images/icons/pin-cross.svg')),
  PinFill: dynamic(() => import('public/images/icons/pin-fill.svg')),
  PinOnMapFill: dynamic(
    () => import('public/images/icons/pin-on-map-fill.svg'),
  ),
  PinOnMap: dynamic(() => import('public/images/icons/pin-on-map.svg')),
  PinWaveFill: dynamic(() => import('public/images/icons/pin-wave-fill.svg')),
  PinWave: dynamic(() => import('public/images/icons/pin-wave.svg')),
  PlaneFill: dynamic(() => import('public/images/icons/plane-fill.svg')),
  Plane: dynamic(() => import('public/images/icons/plane.svg')),
  PlanetEarth: dynamic(() => import('public/images/icons/planet-earth.svg')),
  Play: dynamic(() => import('public/images/icons/play.svg')),
  PlusFill: dynamic(() => import('public/images/icons/plus-fill.svg')),
  Plus: dynamic(() => import('public/images/icons/plus.svg')),
  PointThreeConnectedTrianglepathLineFill: dynamic(
    () =>
      import(
        'public/images/icons/point-three-connected-trianglepath-line-fill.svg'
      ),
  ),
  PointThreeConnectedTrianglepathLine: dynamic(
    () =>
      import('public/images/icons/point-three-connected-trianglepath-line.svg'),
  ),
  PollutionZone: dynamic(
    () => import('public/images/icons/pollution-zone.svg'),
  ),
  Power: dynamic(() => import('public/images/icons/power.svg')),
  Question: dynamic(() => import('public/images/icons/question.svg')),
  Record: dynamic(() => import('public/images/icons/record.svg')),
  RectanglePersonTextWithBadge: dynamic(
    () => import('public/images/icons/rectangle-person-text-with-badge.svg'),
  ),
  SendChatFill: dynamic(() => import('public/images/icons/send-chat-fill.svg')),
  SendChat: dynamic(() => import('public/images/icons/send-chat.svg')),
  ShareFill: dynamic(() => import('public/images/icons/share-fill.svg')),
  Share: dynamic(() => import('public/images/icons/share.svg')),
  Shield1: dynamic(() => import('public/images/icons/shield-1.svg')),
  ShieldCheckFill: dynamic(
    () => import('public/images/icons/shield-check-fill.svg'),
  ),
  ShieldCheck: dynamic(() => import('public/images/icons/shield-check.svg')),
  Shield: dynamic(() => import('public/images/icons/shield.svg')),
  ShoppingBagFill: dynamic(
    () => import('public/images/icons/shopping-bag-fill.svg'),
  ),
  ShoppingBag: dynamic(() => import('public/images/icons/shopping-bag.svg')),
  ShoppingCartFillLtr: dynamic(
    () => import('public/images/icons/shopping-cart-fill-ltr.svg'),
  ),
  ShoppingCartFill: dynamic(
    () => import('public/images/icons/shopping-cart-fill.svg'),
  ),
  ShoppingCartLtr: dynamic(
    () => import('public/images/icons/shopping-cart-ltr.svg'),
  ),
  ShoppingCart: dynamic(() => import('public/images/icons/shopping-cart.svg')),
  SingleCheck: dynamic(() => import('public/images/icons/single-check.svg')),
  SirenFill: dynamic(() => import('public/images/icons/siren-fill.svg')),
  Siren: dynamic(() => import('public/images/icons/siren.svg')),
  SliderHorizontalFill: dynamic(
    () => import('public/images/icons/slider-horizontal-fill.svg'),
  ),
  SliderHorizontal: dynamic(
    () => import('public/images/icons/slider-horizontal.svg'),
  ),
  SparkFill: dynamic(() => import('public/images/icons/spark-fill.svg')),
  SparkSmallFill: dynamic(
    () => import('public/images/icons/spark-small-fill.svg'),
  ),
  SparkSmall: dynamic(() => import('public/images/icons/spark-small.svg')),
  SparkThreeFill: dynamic(
    () => import('public/images/icons/spark-three-fill.svg'),
  ),
  SparkThree: dynamic(() => import('public/images/icons/spark-three.svg')),
  Spark: dynamic(() => import('public/images/icons/spark.svg')),
  SpeakerCross: dynamic(() => import('public/images/icons/speaker-cross.svg')),
  SpeakerExclamation: dynamic(
    () => import('public/images/icons/speaker-exclamation.svg'),
  ),
  SpeakerWave: dynamic(() => import('public/images/icons/speaker-wave.svg')),
  SpiralDotTwo: dynamic(() => import('public/images/icons/spiral-dot-two.svg')),
  SquareAboveSquares: dynamic(
    () => import('public/images/icons/square-above-squares.svg'),
  ),
  SquareFill: dynamic(() => import('public/images/icons/square-fill.svg')),
  SquareFourFill: dynamic(
    () => import('public/images/icons/square-four-fill.svg'),
  ),
  SquareFour: dynamic(() => import('public/images/icons/square-four.svg')),
  SquareGridRoundedFill: dynamic(
    () => import('public/images/icons/square-grid-rounded-fill.svg'),
  ),
  SquareGridRounded: dynamic(
    () => import('public/images/icons/square-grid-rounded.svg'),
  ),
  SquareMoreFill: dynamic(
    () => import('public/images/icons/square-more-fill.svg'),
  ),
  SquareMore: dynamic(() => import('public/images/icons/square-more.svg')),
  SquarePersonFill: dynamic(
    () => import('public/images/icons/square-person-fill.svg'),
  ),
  SquarePerson: dynamic(() => import('public/images/icons/square-person.svg')),
  StarFill: dynamic(() => import('public/images/icons/star-fill.svg')),
  Star: dynamic(() => import('public/images/icons/star.svg')),
  SteerFill: dynamic(() => import('public/images/icons/steer-fill.svg')),
  Steer: dynamic(() => import('public/images/icons/steer.svg')),
  StickyNoteFill: dynamic(
    () => import('public/images/icons/sticky-note-fill.svg'),
  ),
  StickyNote: dynamic(() => import('public/images/icons/sticky-note.svg')),
  StoreFill: dynamic(() => import('public/images/icons/store-fill.svg')),
  Store: dynamic(() => import('public/images/icons/store.svg')),
  SunFill: dynamic(() => import('public/images/icons/sun-fill.svg')),
  Sun: dynamic(() => import('public/images/icons/sun.svg')),
  TapsiLogo: dynamic(() => import('public/images/icons/tapsi-logo.svg')),
  TaraLogo: dynamic(() => import('public/images/icons/tara-logo.svg')),
  TargetFill: dynamic(() => import('public/images/icons/target-fill.svg')),
  TargetSlash: dynamic(() => import('public/images/icons/target-slash.svg')),
  Target: dynamic(() => import('public/images/icons/target.svg')),
  TelephoneFill: dynamic(
    () => import('public/images/icons/telephone-fill.svg'),
  ),
  Telephone: dynamic(() => import('public/images/icons/telephone.svg')),
  ThumbDownFill: dynamic(
    () => import('public/images/icons/thumb-down-fill.svg'),
  ),
  ThumbDown: dynamic(() => import('public/images/icons/thumb-down.svg')),
  ThumbUpFill: dynamic(() => import('public/images/icons/thumb-up-fill.svg')),
  ThumbUp: dynamic(() => import('public/images/icons/thumb-up.svg')),
  Thunder: dynamic(() => import('public/images/icons/thunder.svg')),
  TimerFill: dynamic(() => import('public/images/icons/timer-fill.svg')),
  Timer: dynamic(() => import('public/images/icons/timer.svg')),
  TrafficControlZoneFill: dynamic(
    () => import('public/images/icons/traffic-control-zone-fill.svg'),
  ),
  TrafficLightFill: dynamic(
    () => import('public/images/icons/traffic-light-fill.svg'),
  ),
  TrafficLight: dynamic(() => import('public/images/icons/traffic-light.svg')),
  TrashFill: dynamic(() => import('public/images/icons/trash-fill.svg')),
  Trash: dynamic(() => import('public/images/icons/trash.svg')),
  TriangleExclamationFill: dynamic(
    () => import('public/images/icons/triangle-exclamation-fill.svg'),
  ),
  TriangleExclamation: dynamic(
    () => import('public/images/icons/triangle-exclamation.svg'),
  ),
  UfoFill: dynamic(() => import('public/images/icons/ufo-fill.svg')),
  Ufo: dynamic(() => import('public/images/icons/ufo.svg')),
  VideoTwoFill: dynamic(() => import('public/images/icons/video-two-fill.svg')),
  VideoTwo: dynamic(() => import('public/images/icons/video-two.svg')),
  WalletFill: dynamic(() => import('public/images/icons/wallet-fill.svg')),
  WalletSwap: dynamic(() => import('public/images/icons/wallet-swap.svg')),
  Wallet: dynamic(() => import('public/images/icons/wallet.svg')),
  WifiSlash: dynamic(() => import('public/images/icons/wifi-slash.svg')),
  Wifi: dynamic(() => import('public/images/icons/wifi.svg')),
};
// Define the props for the Icon component
interface IconProps {
  onClick?: () => void;
  name: keyof typeof IconDictionary; // Ensure name is one of the keys in IconDictionary
  size?: number; // Size in rem
  className?: string;
  style?: React.CSSProperties;
  fill?: string;
  stroke?: string;
  [key: string]: any; // Allow additional props
}

// Memoized Icon component definition
const Icon = memo(
  ({
    onClick,
    name,
    width = 1,
    height = 1,
    className,
    style,
    fill,
    stroke,
    viewBox = '0 0 24 24',
    ...props
  }: IconProps): JSX.Element | null => {
    const IconComponent = IconDictionary[name];

    if (!IconComponent) {
      console.error(`Icon ${name as string} not found`);
      return null; // Return null if icon not found
    }

    return (
      <Suspense
        fallback={<div className={`w-[${width}rem] h-[${height}rem]`} />}
      >
        <IconComponent
          onClick={onClick}
          width={`${width}rem`}
          height={`${height}rem`}
          className={className}
          style={style}
          stroke={stroke}
          fill={fill}
          viewBox={viewBox}
          {...props}
        />
      </Suspense>
    );
  },
);

export default Icon;
