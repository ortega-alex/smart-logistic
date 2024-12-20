import { Map } from '@/models';
import { AiFillLock, AiOutlineClose, AiOutlineLogout, AiOutlineMenuFold, AiOutlineMenuUnfold, AiOutlineUpload } from 'react-icons/ai';
import { BiCopy, BiEdit, BiPlus, BiSave, BiSearch, BiUser } from 'react-icons/bi';
import { BsArrowDown, BsArrowUp, BsEye, BsEyeSlash, BsPersonWorkspace } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { CiMenuKebab } from 'react-icons/ci';
import { FaExchangeAlt, FaRegFilePdf, FaRegTrashAlt } from 'react-icons/fa';
import { FaAngleDown } from 'react-icons/fa6';
import { GoBell } from 'react-icons/go';
import { GrAttachment } from 'react-icons/gr';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { IoCheckmarkDone, IoReload, IoStorefrontOutline } from 'react-icons/io5';
import { LiaCarAltSolid } from 'react-icons/lia';
import { LuDownload } from 'react-icons/lu';
import { MdOutlineCalculate, MdOutlineLocalPrintshop, MdOutlineMail } from 'react-icons/md';
import { TbCar, TbCarCrane, TbUsersPlus } from 'react-icons/tb';

export const Icon = {
    AngleDown: FaAngleDown,
    Attachment: GrAttachment,
    ArrowDown: BsArrowDown,
    ArrowUp: BsArrowUp,
    Bell: GoBell,
    Calculate: MdOutlineCalculate,
    Car: LiaCarAltSolid,
    Car2: TbCar,
    ChangeAlt: FaExchangeAlt,
    Close: AiOutlineClose,
    Copy: BiCopy,
    Crane: TbCarCrane,
    Done: IoCheckmarkDone,
    Download: LuDownload,
    Edit: BiEdit,
    EMail: MdOutlineMail,
    Eye: BsEye,
    EyeSlash: BsEyeSlash,
    FilePdf: FaRegFilePdf,
    Lock: AiFillLock,
    Logout: AiOutlineLogout,
    MenuFold: AiOutlineMenuFold,
    MenuKebab: CiMenuKebab,
    MenuUnfold: AiOutlineMenuUnfold,
    Printshop: MdOutlineLocalPrintshop,
    Profile: CgProfile,
    Plus: BiPlus,
    Reload: IoReload,
    Trash: FaRegTrashAlt,
    Upload: AiOutlineUpload,
    User: BiUser,
    Users: TbUsersPlus,
    Report: HiOutlineDocumentReport,
    Save: BiSave,
    Search: BiSearch,
    Store: IoStorefrontOutline,
    Workspace: BsPersonWorkspace
};

export const IconEnun: Map = {
    calculate: <Icon.Calculate size='32%' />,
    car: <Icon.Car size='32%' />,
    car2: <Icon.Car2 size='32%' />,
    crane: <Icon.Crane size='32%' />,
    profile: <Icon.Profile size='32%' />,
    report: <Icon.Report size='32%' />,
    store: <Icon.Store size='32%' />,
    users: <Icon.Users size='32%' />,
    user: <Icon.User size='32%' />
};
