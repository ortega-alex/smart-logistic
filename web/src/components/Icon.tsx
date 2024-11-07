import { Map } from '@/models';
import { AiFillLock, AiOutlineClose, AiOutlineLogout, AiOutlineMenuFold, AiOutlineMenuUnfold, AiOutlineUpload } from 'react-icons/ai';
import { BiEdit, BiPlus, BiSearch, BiUser } from 'react-icons/bi';
import { BsArrowDown, BsEye, BsEyeSlash } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FaRegTrashAlt, FaRegFilePdf } from 'react-icons/fa';
import { FaAngleDown } from 'react-icons/fa6';
import { GoBell } from 'react-icons/go';
import { GrAttachment } from 'react-icons/gr';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { IoStorefrontOutline } from 'react-icons/io5';
import { LiaCarAltSolid } from 'react-icons/lia';
import { MdOutlineCalculate, MdOutlineMail } from 'react-icons/md';
import { TbCar, TbCarCrane, TbUsersPlus } from 'react-icons/tb';

export const Icon = {
    AngleDown: FaAngleDown,
    Attachment: GrAttachment,
    ArrowDown: BsArrowDown,
    Bell: GoBell,
    Calculate: MdOutlineCalculate,
    Car: LiaCarAltSolid,
    Car2: TbCar,
    Close: AiOutlineClose,
    Crane: TbCarCrane,
    Edit: BiEdit,
    EMail: MdOutlineMail,
    Eye: BsEye,
    EyeSlash: BsEyeSlash,
    FilePdf: FaRegFilePdf,
    Lock: AiFillLock,
    Logout: AiOutlineLogout,
    MenuFold: AiOutlineMenuFold,
    MenuUnfold: AiOutlineMenuUnfold,
    Profile: CgProfile,
    Plus: BiPlus,
    Trash: FaRegTrashAlt,
    Upload: AiOutlineUpload,
    User: BiUser,
    Users: TbUsersPlus,
    Report: HiOutlineDocumentReport,
    Search: BiSearch,
    Store: IoStorefrontOutline
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
