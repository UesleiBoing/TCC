import { AiFillHome, AiOutlineForm } from "react-icons/ai";
import { CgLogOut } from "react-icons/cg";
import { FaUserGraduate, FaUserTie, FaWpforms } from "react-icons/fa";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { MdClass, MdSubject, MdTopic } from "react-icons/md";

export const sidebarData = [
    [
        { title: 'Home',        path: '/dashboard',     icon: <AiFillHome />,     },
        { title: 'Estudantes',  path: '/students',      icon: <FaUserGraduate />, },
        { title: 'Professores', path: '/teachers',      icon: <FaUserTie />,      },
    ],
    [
        { title: 'Tópicos',     path: '/topics',        icon: <MdTopic />,        },
        { title: 'Matérias',    path: '/subjects',      icon: <MdSubject />,      },
        { title: 'Classes',     path: '/classes',       icon: <MdClass />,        },
        { title: 'Formulários', path: '/forms',         icon: <AiOutlineForm />,  },
        { title: 'Testes',      path: '/tests',         icon: <FaWpforms />,      },
        { title: 'Logout',      path: '/',              icon: <CgLogOut />,       },
    ]
];