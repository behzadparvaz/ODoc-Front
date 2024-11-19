import { memo, Suspense } from 'react';
import dynamic from 'next/dynamic';

const Language = dynamic(() => import('public/images/icons/Language.svg'));
const AlarmClockFill = dynamic(
  () => import('public/images/icons/alarm-clock-fill.svg'),
);
const AlarmClock = dynamic(() => import('public/images/icons/alarm-clock.svg'));
const ArrowCapsulepath = dynamic(
  () => import('public/images/icons/arrow-capsulepath.svg'),
);
const ArrowCirclepath = dynamic(
  () => import('public/images/icons/arrow-circlepath.svg'),
);
const ArrowDownLeftFill = dynamic(
  () => import('public/images/icons/arrow-down-left-fill.svg'),
);
const ArrowDownLeft = dynamic(
  () => import('public/images/icons/arrow-down-left.svg'),
);
const ArrowDownLine = dynamic(
  () => import('public/images/icons/arrow-down-line.svg'),
);
const ArrowDown = dynamic(() => import('public/images/icons/arrow-down.svg'));
const ArrowLeft = dynamic(() => import('public/images/icons/arrow-left.svg'));
const ArrowRightFill = dynamic(
  () => import('public/images/icons/arrow-right-fill.svg'),
);
const ArrowRightFromBlueDot = dynamic(
  () => import('public/images/icons/arrow-right-from-blue-dot.svg'),
);
const ArrowRightFromLine = dynamic(
  () => import('public/images/icons/arrow-right-from-line.svg'),
);
const ArrowRight = dynamic(() => import('public/images/icons/arrow-right.svg'));
const ArrowTopRight1 = dynamic(
  () => import('public/images/icons/arrow-top-right-1.svg'),
);
const ArrowTopRightQuestionFill = dynamic(
  () => import('public/images/icons/arrow-top-right-question-fill.svg'),
);
const ArrowTopRightQuestion = dynamic(
  () => import('public/images/icons/arrow-top-right-question.svg'),
);
const ArrowTopRight = dynamic(
  () => import('public/images/icons/arrow-top-right.svg'),
);
const ArrowTwoCirclepathHorizontal = dynamic(
  () => import('public/images/icons/arrow-two-circlepath-horizontal.svg'),
);
const ArrowTwoCirclepathVetical = dynamic(
  () => import('public/images/icons/arrow-two-circlepath-vetical.svg'),
);
const ArrowTwoRectanglepathHorizontal = dynamic(
  () => import('public/images/icons/arrow-two-rectanglepath-horizontal.svg'),
);
const ArrowUpArrowDownSmall = dynamic(
  () => import('public/images/icons/arrow-up-arrow-down-small.svg'),
);
const ArrowUpArrowDown = dynamic(
  () => import('public/images/icons/arrow-up-arrow-down.svg'),
);
const ArrowUpRight = dynamic(
  () => import('public/images/icons/arrow-up-right.svg'),
);
const ArrowUp = dynamic(() => import('public/images/icons/arrow-up.svg'));
const ArrowUpwardTrend = dynamic(
  () => import('public/images/icons/arrow-upward-trend.svg'),
);
const AttachFile = dynamic(() => import('public/images/icons/attach-file.svg'));
const BanknoteFill = dynamic(
  () => import('public/images/icons/banknote-fill.svg'),
);
const BanknoteTwoFill = dynamic(
  () => import('public/images/icons/banknote-two-fill.svg'),
);
const BanknoteTwo = dynamic(
  () => import('public/images/icons/banknote-two.svg'),
);
const Banknote = dynamic(() => import('public/images/icons/banknote.svg'));
const BatteryExclamation = dynamic(
  () => import('public/images/icons/battery-exclamation.svg'),
);
const Battery = dynamic(() => import('public/images/icons/battery.svg'));
const BazzarpayLogo = dynamic(
  () => import('public/images/icons/bazzarpay-logo.svg'),
);
const BellDotFill = dynamic(
  () => import('public/images/icons/bell-dot-fill.svg'),
);
const BellFill = dynamic(() => import('public/images/icons/bell-fill.svg'));
const Bell = dynamic(() => import('public/images/icons/bell.svg'));
const BookmarkFill = dynamic(
  () => import('public/images/icons/bookmark-fill.svg'),
);
const Bookmark = dynamic(() => import('public/images/icons/bookmark.svg'));
const BoxCheck = dynamic(() => import('public/images/icons/box-check.svg'));
const BoxFill = dynamic(() => import('public/images/icons/box-fill.svg'));
const Box = dynamic(() => import('public/images/icons/box.svg'));
const BriefcaseFill = dynamic(
  () => import('public/images/icons/briefcase-fill.svg'),
);
const Briefcase = dynamic(() => import('public/images/icons/briefcase.svg'));
const BuildingFill = dynamic(
  () => import('public/images/icons/building-fill.svg'),
);
const Building = dynamic(() => import('public/images/icons/building.svg'));
const CalendarFill = dynamic(
  () => import('public/images/icons/calendar-fill.svg'),
);
const Calendar = dynamic(() => import('public/images/icons/calendar.svg'));
const CallDialogBox = dynamic(
  () => import('public/images/icons/call-dialog-box.svg'),
);
const CallLeftSlash = dynamic(
  () => import('public/images/icons/call-left-slash.svg'),
);
const CallLeft = dynamic(() => import('public/images/icons/call-left.svg'));
const CallRigh = dynamic(() => import('public/images/icons/call-righ.svg'));
const CallRightSlash = dynamic(
  () => import('public/images/icons/call-right-slash.svg'),
);
const CameraFill = dynamic(() => import('public/images/icons/camera-fill.svg'));
const CameraPlus = dynamic(() => import('public/images/icons/camera-plus.svg'));
const Camera = dynamic(() => import('public/images/icons/camera.svg'));
const CarClockFill = dynamic(
  () => import('public/images/icons/car-clock-fill.svg'),
);
const CarClock = dynamic(() => import('public/images/icons/car-clock.svg'));
const CarFill = dynamic(() => import('public/images/icons/car-fill.svg'));
const CarSlashFill = dynamic(
  () => import('public/images/icons/car-slash-fill.svg'),
);
const CarSlash = dynamic(() => import('public/images/icons/car-slash.svg'));
const CarSpark = dynamic(() => import('public/images/icons/car-spark.svg'));
const Car = dynamic(() => import('public/images/icons/car.svg'));
const CardFill = dynamic(() => import('public/images/icons/card-fill.svg'));
const CardLeftArrowFill = dynamic(
  () => import('public/images/icons/card-left-arrow-fill.svg'),
);
const CardLeftArrow = dynamic(
  () => import('public/images/icons/card-left-arrow.svg'),
);
const CardPlusFill = dynamic(
  () => import('public/images/icons/card-plus-fill.svg'),
);
const CardPlus = dynamic(() => import('public/images/icons/card-plus.svg'));
const CardRightArrowFill = dynamic(
  () => import('public/images/icons/card-right-arrow-fill.svg'),
);
const CardRightArrow = dynamic(
  () => import('public/images/icons/card-right-arrow.svg'),
);
const CardSparkFill = dynamic(
  () => import('public/images/icons/card-spark-fill.svg'),
);
const CardSpark = dynamic(() => import('public/images/icons/card-spark.svg'));
const CardTimeFill = dynamic(
  () => import('public/images/icons/card-time-fill.svg'),
);
const CardTime = dynamic(() => import('public/images/icons/card-time.svg'));
const Card = dynamic(() => import('public/images/icons/card.svg'));
const CheckFill = dynamic(() => import('public/images/icons/check-fill.svg'));
const Check = dynamic(() => import('public/images/icons/check.svg'));
const ChevronDownFill = dynamic(
  () => import('public/images/icons/chevron-down-fill.svg'),
);
const ChevronDown = dynamic(
  () => import('public/images/icons/chevron-down.svg'),
);
const ChevronLeftFill = dynamic(
  () => import('public/images/icons/chevron-left-fill.svg'),
);
const ChevronLeft = dynamic(
  () => import('public/images/icons/chevron-left.svg'),
);
const ChevronRightFill = dynamic(
  () => import('public/images/icons/chevron-right-fill.svg'),
);
const ChevronRight = dynamic(
  () => import('public/images/icons/chevron-right.svg'),
);
const ChevronUpFill = dynamic(
  () => import('public/images/icons/chevron-up-fill.svg'),
);
const ChevronUp = dynamic(() => import('public/images/icons/chevron-up.svg'));
const CircleCheckFill = dynamic(
  () => import('public/images/icons/circle-check-fill.svg'),
);
const CircleCheckSmallFill = dynamic(
  () => import('public/images/icons/circle-check-small-fill.svg'),
);
const CircleCheckSmall = dynamic(
  () => import('public/images/icons/circle-check-small.svg'),
);
const CircleCheck = dynamic(
  () => import('public/images/icons/circle-check.svg'),
);
const CircleCrossFill = dynamic(
  () => import('public/images/icons/circle-cross-fill.svg'),
);
const CircleCross = dynamic(
  () => import('public/images/icons/circle-cross.svg'),
);
const CircleExclamationFill = dynamic(
  () => import('public/images/icons/circle-exclamation-fill.svg'),
);
const CircleExclamation = dynamic(
  () => import('public/images/icons/circle-exclamation.svg'),
);
const CircleInformationFill = dynamic(
  () => import('public/images/icons/circle-information-fill.svg'),
);
const CircleInformation = dynamic(
  () => import('public/images/icons/circle-information.svg'),
);
const CircleMinusFill = dynamic(
  () => import('public/images/icons/circle-minus-fill.svg'),
);
const CircleMinus = dynamic(
  () => import('public/images/icons/circle-minus.svg'),
);
const CircleMoreFill = dynamic(
  () => import('public/images/icons/circle-more-fill.svg'),
);
const CirclePersonFill1 = dynamic(
  () => import('public/images/icons/circle-person-fill-1.svg'),
);
const CirclePersonFill = dynamic(
  () => import('public/images/icons/circle-person-fill.svg'),
);
const CirclePerson = dynamic(
  () => import('public/images/icons/circle-person.svg'),
);
const CirclePlusFill = dynamic(
  () => import('public/images/icons/circle-plus-fill.svg'),
);
const CirclePlus = dynamic(() => import('public/images/icons/circle-plus.svg'));
const CircleQuestionFill = dynamic(
  () => import('public/images/icons/circle-question-fill.svg'),
);
const CircleStarFill = dynamic(
  () => import('public/images/icons/circle-star-fill.svg'),
);
const CircleStar = dynamic(() => import('public/images/icons/circle-star.svg'));
const CircleThunderFill = dynamic(
  () => import('public/images/icons/circle-thunder-fill.svg'),
);
const CircleThunder = dynamic(
  () => import('public/images/icons/circle-thunder.svg'),
);
const ClipboardClockFill = dynamic(
  () => import('public/images/icons/clipboard-clock-fill.svg'),
);
const ClipboardClock = dynamic(
  () => import('public/images/icons/clipboard-clock.svg'),
);
const ClipsTogether = dynamic(
  () => import('public/images/icons/clips-together.svg'),
);
const ClockArrowCirclepath = dynamic(
  () => import('public/images/icons/clock-arrow-circlepath.svg'),
);
const ClockDashed = dynamic(
  () => import('public/images/icons/clock-dashed.svg'),
);
const ClockFill = dynamic(() => import('public/images/icons/clock-fill.svg'));
const ClockSmallFill = dynamic(
  () => import('public/images/icons/clock-small-fill.svg'),
);
const ClockSmall = dynamic(() => import('public/images/icons/clock-small.svg'));
const Clock = dynamic(() => import('public/images/icons/clock.svg'));
const CopyFill = dynamic(() => import('public/images/icons/copy-fill.svg'));
const Copy = dynamic(() => import('public/images/icons/copy.svg'));
const CouponFill = dynamic(() => import('public/images/icons/coupon-fill.svg'));
const CouponPuchedFill = dynamic(
  () => import('public/images/icons/coupon-puched-fill.svg'),
);
const CouponPuched = dynamic(
  () => import('public/images/icons/coupon-puched.svg'),
);
const Coupon = dynamic(() => import('public/images/icons/coupon.svg'));
const CrossFill = dynamic(() => import('public/images/icons/cross-fill.svg'));
const Cross = dynamic(() => import('public/images/icons/cross.svg'));
const DefaultFill = dynamic(
  () => import('public/images/icons/default-fill.svg'),
);
const Default = dynamic(() => import('public/images/icons/default.svg'));
const DeleteLeftFill = dynamic(
  () => import('public/images/icons/delete-left-fill.svg'),
);
const DeleteLeft = dynamic(() => import('public/images/icons/delete-left.svg'));
const DialogBoxTextFill = dynamic(
  () => import('public/images/icons/dialog-box-text-fill.svg'),
);
const DialogBoxText = dynamic(
  () => import('public/images/icons/dialog-box-text.svg'),
);
const DialogboxQuestion = dynamic(
  () => import('public/images/icons/dialogbox-question.svg'),
);
const DiamondArrowTurnRight1 = dynamic(
  () => import('public/images/icons/diamond-arrow-turn-right-1.svg'),
);
const DiamondArrowTurnRight = dynamic(
  () => import('public/images/icons/diamond-arrow-turn-right.svg'),
);
const DotFill = dynamic(() => import('public/images/icons/dot-fill.svg'));
const DoubleCheck = dynamic(
  () => import('public/images/icons/double-check.svg'),
);
const EarSlash = dynamic(() => import('public/images/icons/ear-slash.svg'));
const EnvelopeFill = dynamic(
  () => import('public/images/icons/envelope-fill.svg'),
);
const EnvelopeOpenFill = dynamic(
  () => import('public/images/icons/envelope-open-fill.svg'),
);
const EnvelopeOpen = dynamic(
  () => import('public/images/icons/envelope-open.svg'),
);
const Envelope = dynamic(() => import('public/images/icons/envelope.svg'));
const ExclamationFill = dynamic(
  () => import('public/images/icons/exclamation-fill.svg'),
);
const Exclamation = dynamic(
  () => import('public/images/icons/exclamation.svg'),
);
const EyeFill = dynamic(() => import('public/images/icons/eye-fill.svg'));
const EyeSlashFill = dynamic(
  () => import('public/images/icons/eye-slash-fill.svg'),
);
const EyeSlashStripes = dynamic(
  () => import('public/images/icons/eye-slash-stripes.svg'),
);
const EyeSlash = dynamic(() => import('public/images/icons/eye-slash.svg'));
const Eye = dynamic(() => import('public/images/icons/eye.svg'));
const FaceSadFill = dynamic(
  () => import('public/images/icons/face-sad-fill.svg'),
);
const FaceSad = dynamic(() => import('public/images/icons/face-sad.svg'));
const FaceSmileFill = dynamic(
  () => import('public/images/icons/face-smile-fill.svg'),
);
const FaceSmile = dynamic(() => import('public/images/icons/face-smile.svg'));
const FingerLeftFill = dynamic(
  () => import('public/images/icons/finger-left-fill.svg'),
);
const FingerSwipeVertical = dynamic(
  () => import('public/images/icons/finger-swipe-vertical.svg'),
);
const FingerTouch = dynamic(
  () => import('public/images/icons/finger-touch.svg'),
);
const FingerUpFill = dynamic(
  () => import('public/images/icons/finger-up-fill.svg'),
);
const FireFill = dynamic(() => import('public/images/icons/fire-fill.svg'));
const Fire = dynamic(() => import('public/images/icons/fire.svg'));
const FlagFill = dynamic(() => import('public/images/icons/flag-fill.svg'));
const Flag = dynamic(() => import('public/images/icons/flag.svg'));
const GarageLogo = dynamic(() => import('public/images/icons/garage-logo.svg'));
const GasStationFill = dynamic(
  () => import('public/images/icons/gas-station-fill.svg'),
);
const GasStation = dynamic(() => import('public/images/icons/gas-station.svg'));
const GearFill = dynamic(() => import('public/images/icons/gear-fill.svg'));
const Gear = dynamic(() => import('public/images/icons/gear.svg'));
const Gift = dynamic(() => import('public/images/icons/gift.svg'));
const GraduationCapFill = dynamic(
  () => import('public/images/icons/graduation-cap-fill.svg'),
);
const GraduationCap = dynamic(
  () => import('public/images/icons/graduation-cap.svg'),
);
const HeadphoneFill = dynamic(
  () => import('public/images/icons/headphone-fill.svg'),
);
const Headphone = dynamic(() => import('public/images/icons/headphone.svg'));
const HeartBrokenFill = dynamic(
  () => import('public/images/icons/heart-broken-fill.svg'),
);
const HeartFill = dynamic(() => import('public/images/icons/heart-fill.svg'));
const Heart = dynamic(() => import('public/images/icons/heart.svg'));
const HelmetsFillRtl = dynamic(
  () => import('public/images/icons/helmets-fill-rtl.svg'),
);
const HelmetsFill = dynamic(
  () => import('public/images/icons/helmets-fill.svg'),
);
const HelmetsRtl = dynamic(() => import('public/images/icons/helmets-rtl.svg'));
const Helmets = dynamic(() => import('public/images/icons/helmets.svg'));
const HomeFill = dynamic(() => import('public/images/icons/home-fill.svg'));
const Home = dynamic(() => import('public/images/icons/home.svg'));
const HourglassFill = dynamic(
  () => import('public/images/icons/hourglass-fill.svg'),
);
const Hourglass = dynamic(() => import('public/images/icons/hourglass.svg'));
const ImageFill = dynamic(() => import('public/images/icons/image-fill.svg'));
const ImageTwoFill = dynamic(
  () => import('public/images/icons/image-two-fill.svg'),
);
const ImageTwo = dynamic(() => import('public/images/icons/image-two.svg'));
const Image = dynamic(() => import('public/images/icons/image.svg'));
const InfoFill = dynamic(() => import('public/images/icons/info-fill.svg'));
const Info = dynamic(() => import('public/images/icons/info.svg'));
const KeyboardFill = dynamic(
  () => import('public/images/icons/keyboard-fill.svg'),
);
const Keyboard = dynamic(() => import('public/images/icons/keyboard.svg'));
const LampSparkFill = dynamic(
  () => import('public/images/icons/lamp-spark-fill.svg'),
);
const LineThreeHorizontalDecrease = dynamic(
  () => import('public/images/icons/line-three-horizontal-decrease.svg'),
);
const LineThree = dynamic(() => import('public/images/icons/line-three.svg'));
const ListBullet = dynamic(() => import('public/images/icons/list-bullet.svg'));
const LoadingSpinner = dynamic(
  () => import('public/images/icons/loading-spinner.svg'),
);
const Loading = dynamic(() => import('public/images/icons/loading.svg'));
const LocationLeft = dynamic(
  () => import('public/images/icons/location-left.svg'),
);
const LocationUp = dynamic(() => import('public/images/icons/location-up.svg'));
const LockFill = dynamic(() => import('public/images/icons/lock-fill.svg'));
const LockSmallFill = dynamic(
  () => import('public/images/icons/lock-small-fill.svg'),
);
const LockSmall = dynamic(() => import('public/images/icons/lock-small.svg'));
const Lock = dynamic(() => import('public/images/icons/lock.svg'));
const MagnifierFill = dynamic(
  () => import('public/images/icons/magnifier-fill.svg'),
);
const Magnifier = dynamic(() => import('public/images/icons/magnifier.svg'));
const MapFill = dynamic(() => import('public/images/icons/map-fill.svg'));
const Map = dynamic(() => import('public/images/icons/map.svg'));
const Medal1 = dynamic(() => import('public/images/icons/medal-1.svg'));
const MedalFill1 = dynamic(
  () => import('public/images/icons/medal-fill-1.svg'),
);
const MedalFill = dynamic(() => import('public/images/icons/medal-fill.svg'));
const Medal = dynamic(() => import('public/images/icons/medal.svg'));
const MicrophoneFill = dynamic(
  () => import('public/images/icons/microphone-fill.svg'),
);
const MicrophoneSlashFill = dynamic(
  () => import('public/images/icons/microphone-slash-fill.svg'),
);
const MicrophoneSlash = dynamic(
  () => import('public/images/icons/microphone-slash.svg'),
);
const MicrophoneSparkFill = dynamic(
  () => import('public/images/icons/microphone-spark-fill.svg'),
);
const MicrophoneSpark = dynamic(
  () => import('public/images/icons/microphone-spark.svg'),
);
const Microphone = dynamic(() => import('public/images/icons/microphone.svg'));
const MinusFill = dynamic(() => import('public/images/icons/minus-fill.svg'));
const Minus = dynamic(() => import('public/images/icons/minus.svg'));
const MoonFill = dynamic(() => import('public/images/icons/moon-fill.svg'));
const Moon = dynamic(() => import('public/images/icons/moon.svg'));
const MoreHorizontalFill = dynamic(
  () => import('public/images/icons/more-horizontal-fill.svg'),
);
const MoreHorizontal = dynamic(
  () => import('public/images/icons/more-horizontal.svg'),
);
const MoreVerticalFill = dynamic(
  () => import('public/images/icons/more-vertical-fill.svg'),
);
const MoreVertical = dynamic(
  () => import('public/images/icons/more-vertical.svg'),
);
const Motorcycle = dynamic(() => import('public/images/icons/motorcycle.svg'));
const Pause = dynamic(() => import('public/images/icons/pause.svg'));
const PencilLineFill = dynamic(
  () => import('public/images/icons/pencil-line-fill.svg'),
);
const PencilLine = dynamic(() => import('public/images/icons/pencil-line.svg'));
const Person1 = dynamic(() => import('public/images/icons/person-1.svg'));
const PersonFill1 = dynamic(
  () => import('public/images/icons/person-fill-1.svg'),
);
const PersonFill = dynamic(() => import('public/images/icons/person-fill.svg'));
const PersonInWheelchair = dynamic(
  () => import('public/images/icons/person-in-wheelchair.svg'),
);
const PersonMinusFill = dynamic(
  () => import('public/images/icons/person-minus-fill.svg'),
);
const PersonMinus = dynamic(
  () => import('public/images/icons/person-minus.svg'),
);
const PersonPlusFill = dynamic(
  () => import('public/images/icons/person-plus-fill.svg'),
);
const PersonPlus = dynamic(() => import('public/images/icons/person-plus.svg'));
const PersonTwoFill = dynamic(
  () => import('public/images/icons/person-two-fill.svg'),
);
const PersonTwo = dynamic(() => import('public/images/icons/person-two.svg'));
const PersonWaveFill = dynamic(
  () => import('public/images/icons/person-wave-fill.svg'),
);
const PersonWave = dynamic(() => import('public/images/icons/person-wave.svg'));
const Person = dynamic(() => import('public/images/icons/person.svg'));
const PhoneFill = dynamic(() => import('public/images/icons/phone-fill.svg'));
const PhoneVibrateFill = dynamic(
  () => import('public/images/icons/phone-vibrate-fill.svg'),
);
const PhoneVibrate = dynamic(
  () => import('public/images/icons/phone-vibrate.svg'),
);
const Phone = dynamic(() => import('public/images/icons/phone.svg'));
const PinCircleFill = dynamic(
  () => import('public/images/icons/pin-circle-fill.svg'),
);
const PinCircle = dynamic(() => import('public/images/icons/pin-circle.svg'));
const PinCrossFill = dynamic(
  () => import('public/images/icons/pin-cross-fill.svg'),
);
const PinCross = dynamic(() => import('public/images/icons/pin-cross.svg'));
const PinFill = dynamic(() => import('public/images/icons/pin-fill.svg'));
const PinOnMapFill = dynamic(
  () => import('public/images/icons/pin-on-map-fill.svg'),
);
const PinOnMap = dynamic(() => import('public/images/icons/pin-on-map.svg'));
const PinWaveFill = dynamic(
  () => import('public/images/icons/pin-wave-fill.svg'),
);
const PinWave = dynamic(() => import('public/images/icons/pin-wave.svg'));
const PlaneFill = dynamic(() => import('public/images/icons/plane-fill.svg'));
const Plane = dynamic(() => import('public/images/icons/plane.svg'));
const PlanetEarth = dynamic(
  () => import('public/images/icons/planet-earth.svg'),
);
const Play = dynamic(() => import('public/images/icons/play.svg'));
const PlusFill = dynamic(() => import('public/images/icons/plus-fill.svg'));
const Plus = dynamic(() => import('public/images/icons/plus.svg'));
const PointThreeConnectedTrianglepathLineFill = dynamic(
  () =>
    import(
      'public/images/icons/point-three-connected-trianglepath-line-fill.svg'
    ),
);
const PointThreeConnectedTrianglepathLine = dynamic(
  () =>
    import('public/images/icons/point-three-connected-trianglepath-line.svg'),
);
const PollutionZone = dynamic(
  () => import('public/images/icons/pollution-zone.svg'),
);
const Power = dynamic(() => import('public/images/icons/power.svg'));
const Question = dynamic(() => import('public/images/icons/question.svg'));
const Record = dynamic(() => import('public/images/icons/record.svg'));
const RectanglePersonTextWithBadge = dynamic(
  () => import('public/images/icons/rectangle-person-text-with-badge.svg'),
);
const SendChatFill = dynamic(
  () => import('public/images/icons/send-chat-fill.svg'),
);
const SendChat = dynamic(() => import('public/images/icons/send-chat.svg'));
const ShareFill = dynamic(() => import('public/images/icons/share-fill.svg'));
const Share = dynamic(() => import('public/images/icons/share.svg'));
const Shield1 = dynamic(() => import('public/images/icons/shield-1.svg'));
const ShieldCheckFill = dynamic(
  () => import('public/images/icons/shield-check-fill.svg'),
);
const ShieldCheck = dynamic(
  () => import('public/images/icons/shield-check.svg'),
);
const Shield = dynamic(() => import('public/images/icons/shield.svg'));
const ShoppingBagFill = dynamic(
  () => import('public/images/icons/shopping-bag-fill.svg'),
);
const ShoppingBag = dynamic(
  () => import('public/images/icons/shopping-bag.svg'),
);
const ShoppingCartFillLtr = dynamic(
  () => import('public/images/icons/shopping-cart-fill-ltr.svg'),
);
const ShoppingCartFill = dynamic(
  () => import('public/images/icons/shopping-cart-fill.svg'),
);
const ShoppingCartLtr = dynamic(
  () => import('public/images/icons/shopping-cart-ltr.svg'),
);
const ShoppingCart = dynamic(
  () => import('public/images/icons/shopping-cart.svg'),
);
const SingleCheck = dynamic(
  () => import('public/images/icons/single-check.svg'),
);
const SirenFill = dynamic(() => import('public/images/icons/siren-fill.svg'));
const Siren = dynamic(() => import('public/images/icons/siren.svg'));
const SliderHorizontalFill = dynamic(
  () => import('public/images/icons/slider-horizontal-fill.svg'),
);
const SliderHorizontal = dynamic(
  () => import('public/images/icons/slider-horizontal.svg'),
);
const SparkFill = dynamic(() => import('public/images/icons/spark-fill.svg'));
const SparkSmallFill = dynamic(
  () => import('public/images/icons/spark-small-fill.svg'),
);
const SparkSmall = dynamic(() => import('public/images/icons/spark-small.svg'));
const SparkThreeFill = dynamic(
  () => import('public/images/icons/spark-three-fill.svg'),
);
const SparkThree = dynamic(() => import('public/images/icons/spark-three.svg'));
const Spark = dynamic(() => import('public/images/icons/spark.svg'));
const SpeakerCross = dynamic(
  () => import('public/images/icons/speaker-cross.svg'),
);
const SpeakerExclamation = dynamic(
  () => import('public/images/icons/speaker-exclamation.svg'),
);
const SpeakerWave = dynamic(
  () => import('public/images/icons/speaker-wave.svg'),
);
const SpiralDotTwo = dynamic(
  () => import('public/images/icons/spiral-dot-two.svg'),
);
const SquareAboveSquares = dynamic(
  () => import('public/images/icons/square-above-squares.svg'),
);
const SquareFill = dynamic(() => import('public/images/icons/square-fill.svg'));
const SquareFourFill = dynamic(
  () => import('public/images/icons/square-four-fill.svg'),
);
const SquareFour = dynamic(() => import('public/images/icons/square-four.svg'));
const SquareGridRoundedFill = dynamic(
  () => import('public/images/icons/square-grid-rounded-fill.svg'),
);
const SquareGridRounded = dynamic(
  () => import('public/images/icons/square-grid-rounded.svg'),
);
const SquareMoreFill = dynamic(
  () => import('public/images/icons/square-more-fill.svg'),
);
const SquareMore = dynamic(() => import('public/images/icons/square-more.svg'));
const SquarePersonFill = dynamic(
  () => import('public/images/icons/square-person-fill.svg'),
);
const SquarePerson = dynamic(
  () => import('public/images/icons/square-person.svg'),
);
const StarFill = dynamic(() => import('public/images/icons/star-fill.svg'));
const Star = dynamic(() => import('public/images/icons/star.svg'));
const SteerFill = dynamic(() => import('public/images/icons/steer-fill.svg'));
const Steer = dynamic(() => import('public/images/icons/steer.svg'));
const StickyNoteFill = dynamic(
  () => import('public/images/icons/sticky-note-fill.svg'),
);
const StickyNote = dynamic(() => import('public/images/icons/sticky-note.svg'));
const StoreFill = dynamic(() => import('public/images/icons/store-fill.svg'));
const Store = dynamic(() => import('public/images/icons/store.svg'));
const SunFill = dynamic(() => import('public/images/icons/sun-fill.svg'));
const Sun = dynamic(() => import('public/images/icons/sun.svg'));
const TapsiLogo = dynamic(() => import('public/images/icons/tapsi-logo.svg'));
const TaraLogo = dynamic(() => import('public/images/icons/tara-logo.svg'));
const TargetFill = dynamic(() => import('public/images/icons/target-fill.svg'));
const TargetSlash = dynamic(
  () => import('public/images/icons/target-slash.svg'),
);
const Target = dynamic(() => import('public/images/icons/target.svg'));
const TelephoneFill = dynamic(
  () => import('public/images/icons/telephone-fill.svg'),
);
const Telephone = dynamic(() => import('public/images/icons/telephone.svg'));
const ThumbDownFill = dynamic(
  () => import('public/images/icons/thumb-down-fill.svg'),
);
const ThumbDown = dynamic(() => import('public/images/icons/thumb-down.svg'));
const ThumbUpFill = dynamic(
  () => import('public/images/icons/thumb-up-fill.svg'),
);
const ThumbUp = dynamic(() => import('public/images/icons/thumb-up.svg'));
const Thunder = dynamic(() => import('public/images/icons/thunder.svg'));
const TimerFill = dynamic(() => import('public/images/icons/timer-fill.svg'));
const Timer = dynamic(() => import('public/images/icons/timer.svg'));
const TrafficControlZoneFill = dynamic(
  () => import('public/images/icons/traffic-control-zone-fill.svg'),
);
const TrafficLightFill = dynamic(
  () => import('public/images/icons/traffic-light-fill.svg'),
);
const TrafficLight = dynamic(
  () => import('public/images/icons/traffic-light.svg'),
);
const TrashFill = dynamic(() => import('public/images/icons/trash-fill.svg'));
const Trash = dynamic(() => import('public/images/icons/trash.svg'));
const TriangleExclamationFill = dynamic(
  () => import('public/images/icons/triangle-exclamation-fill.svg'),
);
const TriangleExclamation = dynamic(
  () => import('public/images/icons/triangle-exclamation.svg'),
);
const UfoFill = dynamic(() => import('public/images/icons/ufo-fill.svg'));
const Ufo = dynamic(() => import('public/images/icons/ufo.svg'));
const VideoTwoFill = dynamic(
  () => import('public/images/icons/video-two-fill.svg'),
);
const VideoTwo = dynamic(() => import('public/images/icons/video-two.svg'));
const WalletFill = dynamic(() => import('public/images/icons/wallet-fill.svg'));
const WalletSwap = dynamic(() => import('public/images/icons/wallet-swap.svg'));
const Wallet = dynamic(() => import('public/images/icons/wallet.svg'));
const WifiSlash = dynamic(() => import('public/images/icons/wifi-slash.svg'));
const Wifi = dynamic(() => import('public/images/icons/wifi.svg'));

// Icon Dictionary with lazy loading
const IconDictionary: any = {
  Language: Language,
  AlarmClockFill: AlarmClockFill,
  AlarmClock: AlarmClock,
  ArrowCapsulepath: ArrowCapsulepath,
  ArrowCirclepath: ArrowCirclepath,
  ArrowDownLeftFill: ArrowDownLeftFill,
  ArrowDownLeft: ArrowDownLeft,
  ArrowDownLine: ArrowDownLine,
  ArrowDown: ArrowDown,
  ArrowLeft: ArrowLeft,
  ArrowRightFill: ArrowRightFill,
  ArrowRightFromBlueDot: ArrowRightFromBlueDot,
  ArrowRightFromLine: ArrowRightFromLine,
  ArrowRight: ArrowRight,
  ArrowTopRight1: ArrowTopRight1,
  ArrowTopRightQuestionFill: ArrowTopRightQuestionFill,
  ArrowTopRightQuestion: ArrowTopRightQuestion,
  ArrowTopRight: ArrowTopRight,
  ArrowTwoCirclepathHorizontal: ArrowTwoCirclepathHorizontal,
  ArrowTwoCirclepathVetical: ArrowTwoCirclepathVetical,
  ArrowTwoRectanglepathHorizontal: ArrowTwoRectanglepathHorizontal,
  ArrowUpArrowDownSmall: ArrowUpArrowDownSmall,
  ArrowUpArrowDown: ArrowUpArrowDown,
  ArrowUpRight: ArrowUpRight,
  ArrowUp: ArrowUp,
  ArrowUpwardTrend: ArrowUpwardTrend,
  AttachFile: AttachFile,
  BanknoteFill: BanknoteFill,
  BanknoteTwoFill: BanknoteTwoFill,
  BanknoteTwo: BanknoteTwo,
  Banknote: Banknote,
  BatteryExclamation: BatteryExclamation,
  Battery: Battery,
  BazzarpayLogo: BazzarpayLogo,
  BellDotFill: BellDotFill,
  BellFill: BellFill,
  Bell: Bell,
  BookmarkFill: BookmarkFill,
  Bookmark: Bookmark,
  BoxCheck: BoxCheck,
  BoxFill: BoxFill,
  Box: Box,
  BriefcaseFill: BriefcaseFill,
  Briefcase: Briefcase,
  BuildingFill: BuildingFill,
  Building: Building,
  CalendarFill: CalendarFill,
  Calendar: Calendar,
  CallDialogBox: CallDialogBox,
  CallLeftSlash: CallLeftSlash,
  CallLeft: CallLeft,
  CallRigh: CallRigh,
  CallRightSlash: CallRightSlash,
  CameraFill: CameraFill,
  CameraPlus: CameraPlus,
  Camera: Camera,
  CarClockFill: CarClockFill,
  CarClock: CarClock,
  CarFill: CarFill,
  CarSlashFill: CarSlashFill,
  CarSlash: CarSlash,
  CarSpark: CarSpark,
  Car: Car,
  CardFill: CardFill,
  CardLeftArrowFill: CardLeftArrowFill,
  CardLeftArrow: CardLeftArrow,
  CardPlusFill: CardPlusFill,
  CardPlus: CardPlus,
  CardRightArrowFill: CardRightArrowFill,
  CardRightArrow: CardRightArrow,
  CardSparkFill: CardSparkFill,
  CardSpark: CardSpark,
  CardTimeFill: CardTimeFill,
  CardTime: CardTime,
  Card: Card,
  CheckFill: CheckFill,
  Check: Check,
  ChevronDownFill: ChevronDownFill,
  ChevronDown: ChevronDown,
  ChevronLeftFill: ChevronLeftFill,
  ChevronLeft: ChevronLeft,
  ChevronRightFill: ChevronRightFill,
  ChevronRight: ChevronRight,
  ChevronUpFill: ChevronUpFill,
  ChevronUp: ChevronUp,
  CircleCheckFill: CircleCheckFill,
  CircleCheckSmallFill: CircleCheckSmallFill,
  CircleCheckSmall: CircleCheckSmall,
  CircleCheck: CircleCheck,
  CircleCrossFill: CircleCrossFill,
  CircleCross: CircleCross,
  CircleExclamationFill: CircleExclamationFill,
  CircleExclamation: CircleExclamation,
  CircleInformationFill: CircleInformationFill,
  CircleInformation: CircleInformation,
  CircleMinusFill: CircleMinusFill,
  CircleMinus: CircleMinus,
  CircleMoreFill: CircleMoreFill,
  CirclePersonFill1: CirclePersonFill1,
  CirclePersonFill: CirclePersonFill,
  CirclePerson: CirclePerson,
  CirclePlusFill: CirclePlusFill,
  CirclePlus: CirclePlus,
  CircleQuestionFill: CircleQuestionFill,
  CircleStarFill: CircleStarFill,
  CircleStar: CircleStar,
  CircleThunderFill: CircleThunderFill,
  CircleThunder: CircleThunder,
  ClipboardClockFill: ClipboardClockFill,
  ClipboardClock: ClipboardClock,
  ClipsTogether: ClipsTogether,
  ClockArrowCirclepath: ClockArrowCirclepath,
  ClockDashed: ClockDashed,
  ClockFill: ClockFill,
  ClockSmallFill: ClockSmallFill,
  ClockSmall: ClockSmall,
  Clock: Clock,
  CopyFill: CopyFill,
  Copy: Copy,
  CouponFill: CouponFill,
  CouponPuchedFill: CouponPuchedFill,
  CouponPuched: CouponPuched,
  Coupon: Coupon,
  CrossFill: CrossFill,
  Cross: Cross,
  DefaultFill: DefaultFill,
  Default: Default,
  DeleteLeftFill: DeleteLeftFill,
  DeleteLeft: DeleteLeft,
  DialogBoxTextFill: DialogBoxTextFill,
  DialogBoxText: DialogBoxText,
  DialogboxQuestion: DialogboxQuestion,
  DiamondArrowTurnRight1: DiamondArrowTurnRight1,
  DiamondArrowTurnRight: DiamondArrowTurnRight,
  DotFill: DotFill,
  DoubleCheck: DoubleCheck,
  EarSlash: EarSlash,
  EnvelopeFill: EnvelopeFill,
  EnvelopeOpenFill: EnvelopeOpenFill,
  EnvelopeOpen: EnvelopeOpen,
  Envelope: Envelope,
  ExclamationFill: ExclamationFill,
  Exclamation: Exclamation,
  EyeFill: EyeFill,
  EyeSlashFill: EyeSlashFill,
  EyeSlashStripes: EyeSlashStripes,
  EyeSlash: EyeSlash,
  Eye: Eye,
  FaceSadFill: FaceSadFill,
  FaceSad: FaceSad,
  FaceSmileFill: FaceSmileFill,
  FaceSmile: FaceSmile,
  FingerLeftFill: FingerLeftFill,
  FingerSwipeVertical: FingerSwipeVertical,
  FingerTouch: FingerTouch,
  FingerUpFill: FingerUpFill,
  FireFill: FireFill,
  Fire: Fire,
  FlagFill: FlagFill,
  Flag: Flag,
  GarageLogo: GarageLogo,
  GasStationFill: GasStationFill,
  GasStation: GasStation,
  GearFill: GearFill,
  Gear: Gear,
  Gift: Gift,
  GraduationCapFill: GraduationCapFill,
  GraduationCap: GraduationCap,
  HeadphoneFill: HeadphoneFill,
  Headphone: Headphone,
  HeartBrokenFill: HeartBrokenFill,
  HeartFill: HeartFill,
  Heart: Heart,
  HelmetsFillRtl: HelmetsFillRtl,
  HelmetsFill: HelmetsFill,
  HelmetsRtl: HelmetsRtl,
  Helmets: Helmets,
  HomeFill: HomeFill,
  Home: Home,
  HourglassFill: HourglassFill,
  Hourglass: Hourglass,
  ImageFill: ImageFill,
  ImageTwoFill: ImageTwoFill,
  ImageTwo: ImageTwo,
  Image: Image,
  InfoFill: InfoFill,
  Info: Info,
  KeyboardFill: KeyboardFill,
  Keyboard: Keyboard,
  LampSparkFill: LampSparkFill,
  LineThreeHorizontalDecrease: LineThreeHorizontalDecrease,
  LineThree: LineThree,
  ListBullet: ListBullet,
  LoadingSpinner: LoadingSpinner,
  Loading: Loading,
  LocationLeft: LocationLeft,
  LocationUp: LocationUp,
  LockFill: LockFill,
  LockSmallFill: LockSmallFill,
  LockSmall: LockSmall,
  Lock: Lock,
  MagnifierFill: MagnifierFill,
  Magnifier: Magnifier,
  MapFill: MapFill,
  Map: Map,
  Medal1: Medal1,
  MedalFill1: MedalFill1,
  MedalFill: MedalFill,
  Medal: Medal,
  MicrophoneFill: MicrophoneFill,
  MicrophoneSlashFill: MicrophoneSlashFill,
  MicrophoneSlash: MicrophoneSlash,
  MicrophoneSparkFill: MicrophoneSparkFill,
  MicrophoneSpark: MicrophoneSpark,
  Microphone: Microphone,
  MinusFill: MinusFill,
  Minus: Minus,
  MoonFill: MoonFill,
  Moon: Moon,
  MoreHorizontalFill: MoreHorizontalFill,
  MoreHorizontal: MoreHorizontal,
  MoreVerticalFill: MoreVerticalFill,
  MoreVertical: MoreVertical,
  Motorcycle: Motorcycle,
  Pause: Pause,
  PencilLineFill: PencilLineFill,
  PencilLine: PencilLine,
  Person1: Person1,
  PersonFill1: PersonFill1,
  PersonFill: PersonFill,
  PersonInWheelchair: PersonInWheelchair,
  PersonMinusFill: PersonMinusFill,
  PersonMinus: PersonMinus,
  PersonPlusFill: PersonPlusFill,
  PersonPlus: PersonPlus,
  PersonTwoFill: PersonTwoFill,
  PersonTwo: PersonTwo,
  PersonWaveFill: PersonWaveFill,
  PersonWave: PersonWave,
  Person: Person,
  PhoneFill: PhoneFill,
  PhoneVibrateFill: PhoneVibrateFill,
  PhoneVibrate: PhoneVibrate,
  Phone: Phone,
  PinCircleFill: PinCircleFill,
  PinCircle: PinCircle,
  PinCrossFill: PinCrossFill,
  PinCross: PinCross,
  PinFill: PinFill,
  PinOnMapFill: PinOnMapFill,
  PinOnMap: PinOnMap,
  PinWaveFill: PinWaveFill,
  PinWave: PinWave,
  PlaneFill: PlaneFill,
  Plane: Plane,
  PlanetEarth: PlanetEarth,
  Play: Play,
  PlusFill: PlusFill,
  Plus: Plus,
  PointThreeConnectedTrianglepathLineFill:
    PointThreeConnectedTrianglepathLineFill,
  PointThreeConnectedTrianglepathLine: PointThreeConnectedTrianglepathLine,
  PollutionZone: PollutionZone,
  Power: Power,
  Question: Question,
  Record: Record,
  RectanglePersonTextWithBadge: RectanglePersonTextWithBadge,
  SendChatFill: SendChatFill,
  SendChat: SendChat,
  ShareFill: ShareFill,
  Share: Share,
  Shield1: Shield1,
  ShieldCheckFill: ShieldCheckFill,
  ShieldCheck: ShieldCheck,
  Shield: Shield,
  ShoppingBagFill: ShoppingBagFill,
  ShoppingBag: ShoppingBag,
  ShoppingCartFillLtr: ShoppingCartFillLtr,
  ShoppingCartFill: ShoppingCartFill,
  ShoppingCartLtr: ShoppingCartLtr,
  ShoppingCart: ShoppingCart,
  SingleCheck: SingleCheck,
  SirenFill: SirenFill,
  Siren: Siren,
  SliderHorizontalFill: SliderHorizontalFill,
  SliderHorizontal: SliderHorizontal,
  SparkFill: SparkFill,
  SparkSmallFill: SparkSmallFill,
  SparkSmall: SparkSmall,
  SparkThreeFill: SparkThreeFill,
  SparkThree: SparkThree,
  Spark: Spark,
  SpeakerCross: SpeakerCross,
  SpeakerExclamation: SpeakerExclamation,
  SpeakerWave: SpeakerWave,
  SpiralDotTwo: SpiralDotTwo,
  SquareAboveSquares: SquareAboveSquares,
  SquareFill: SquareFill,
  SquareFourFill: SquareFourFill,
  SquareFour: SquareFour,
  SquareGridRoundedFill: SquareGridRoundedFill,
  SquareGridRounded: SquareGridRounded,
  SquareMoreFill: SquareMoreFill,
  SquareMore: SquareMore,
  SquarePersonFill: SquarePersonFill,
  SquarePerson: SquarePerson,
  StarFill: StarFill,
  Star: Star,
  SteerFill: SteerFill,
  Steer: Steer,
  StickyNoteFill: StickyNoteFill,
  StickyNote: StickyNote,
  StoreFill: StoreFill,
  Store: Store,
  SunFill: SunFill,
  Sun: Sun,
  TapsiLogo: TapsiLogo,
  TaraLogo: TaraLogo,
  TargetFill: TargetFill,
  TargetSlash: TargetSlash,
  Target: Target,
  TelephoneFill: TelephoneFill,
  Telephone: Telephone,
  ThumbDownFill: ThumbDownFill,
  ThumbDown: ThumbDown,
  ThumbUpFill: ThumbUpFill,
  ThumbUp: ThumbUp,
  Thunder: Thunder,
  TimerFill: TimerFill,
  Timer: Timer,
  TrafficControlZoneFill: TrafficControlZoneFill,
  TrafficLightFill: TrafficLightFill,
  TrafficLight: TrafficLight,
  TrashFill: TrashFill,
  Trash: Trash,
  TriangleExclamationFill: TriangleExclamationFill,
  TriangleExclamation: TriangleExclamation,
  UfoFill: UfoFill,
  Ufo: Ufo,
  VideoTwoFill: VideoTwoFill,
  VideoTwo: VideoTwo,
  WalletFill: WalletFill,
  WalletSwap: WalletSwap,
  Wallet: Wallet,
  WifiSlash: WifiSlash,
  Wifi: Wifi,
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
    ...props
  }: IconProps): JSX.Element | null => {
    const IconComponent = IconDictionary[name];

    if (!IconComponent) {
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
          {...props}
        />
      </Suspense>
    );
  },
);

export default Icon;
