import { Map } from '@/interfaces';
import { AiFillLock, AiOutlineClose, AiOutlineLogout, AiOutlineMenuFold, AiOutlineMenuUnfold, AiOutlineUpload } from 'react-icons/ai';
import { BiCopy, BiEdit, BiPlus, BiSave, BiSearch, BiUser } from 'react-icons/bi';
import { BsArrowDown, BsArrowUp, BsEye, BsEyeSlash, BsPersonWorkspace } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { CiMenuKebab } from 'react-icons/ci';
import { FaArrowLeft, FaArrowRight, FaCogs, FaExchangeAlt, FaRegFilePdf, FaRegTrashAlt } from 'react-icons/fa';
import { FaAngleDown, FaSackDollar } from 'react-icons/fa6';
import { FiPhone, FiUsers } from 'react-icons/fi';
import { GiGuatemala, GiUsaFlag } from 'react-icons/gi';
import { GoBell } from 'react-icons/go';
import { GrAttachment } from 'react-icons/gr';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { IoIosInformationCircleOutline, IoMdArrowRoundBack } from 'react-icons/io';
import { IoCalendar, IoCheckmarkDone, IoReload, IoStorefrontOutline } from 'react-icons/io5';
import { LiaCarAltSolid } from 'react-icons/lia';
import { LuAlarmClock, LuDownload } from 'react-icons/lu';
import { MdMyLocation, MdOutlineCalculate, MdOutlineDone, MdOutlineLocalPrintshop, MdOutlineMail } from 'react-icons/md';
import { RiAuctionLine } from 'react-icons/ri';
import { TbArrowsExchange2, TbCar, TbCarCrane, TbUsersPlus } from 'react-icons/tb';

export const Icon = {
    AngleDown: FaAngleDown,
    ArrowBack: IoMdArrowRoundBack,
    ArrowDown: BsArrowDown,
    ArrowsExchange: TbArrowsExchange2,
    ArrowUp: BsArrowUp,
    ArrowLef: FaArrowLeft,
    ArrowRight: FaArrowRight,
    Attachment: GrAttachment,
    AuctionLine: RiAuctionLine,
    Bell: GoBell,
    Calendar: IoCalendar,
    Calculate: MdOutlineCalculate,
    Car: LiaCarAltSolid,
    Car2: TbCar,
    ChangeAlt: FaExchangeAlt,
    Close: AiOutlineClose,
    Cog: FaCogs,
    Copy: BiCopy,
    Clock: LuAlarmClock,
    Crane: TbCarCrane,
    DoneAll: IoCheckmarkDone,
    Done: MdOutlineDone,
    Download: LuDownload,
    Edit: BiEdit,
    EMail: MdOutlineMail,
    Eye: BsEye,
    EyeSlash: BsEyeSlash,
    FilePdf: FaRegFilePdf,
    Guatemala: GiGuatemala,
    InfoCircle: IoIosInformationCircleOutline,
    Location: MdMyLocation,
    Lock: AiFillLock,
    Logout: AiOutlineLogout,
    MenuFold: AiOutlineMenuFold,
    MenuKebab: CiMenuKebab,
    MenuUnfold: AiOutlineMenuUnfold,
    Phone: FiPhone,
    Printshop: MdOutlineLocalPrintshop,
    Profile: CgProfile,
    Plus: BiPlus,
    SackDollar: FaSackDollar,
    Reload: IoReload,
    Trash: FaRegTrashAlt,
    Upload: AiOutlineUpload,
    Usa: GiUsaFlag,
    User: BiUser,
    Users: FiUsers,
    UsersPlus: TbUsersPlus,
    Report: HiOutlineDocumentReport,
    Save: BiSave,
    Search: BiSearch,
    Store: IoStorefrontOutline,
    Workspace: BsPersonWorkspace
};

export const IconEnun: Map = {
    auction: <Icon.AuctionLine size='32%' />,
    calendar: <Icon.Calendar size='32%' />,
    calculate: <Icon.Calculate size='32%' />,
    car: <Icon.Car size='32%' />,
    car2: <Icon.Car2 size='32%' />,
    crane: <Icon.Crane size='32%' />,
    profile: <Icon.Profile size='32%' />,
    report: <Icon.Report size='32%' />,
    store: <Icon.Store size='32%' />,
    users: <Icon.Users size='32%' />,
    usersPlus: <Icon.UsersPlus size='32%' />,
    user: <Icon.User size='32%' />,
    sackDollar: <Icon.SackDollar size='32%' />,
    auction_mobile: <Icon.AuctionLine />,
    calculate_mobile: <Icon.Calculate />,
    calendar_mobile: <Icon.Calendar />,
    car_mobile: <Icon.Car />,
    car2_mobile: <Icon.Car2 />,
    crane_mobile: <Icon.Crane />,
    profile_mobile: <Icon.Profile />,
    report_mobile: <Icon.Report />,
    store_mobile: <Icon.Store />,
    users_mobile: <Icon.Users />,
    user_mobile: <Icon.User />,
    usersPlus_mobile: <Icon.UsersPlus />,
    sackDollar_mobile: <Icon.SackDollar />
};
