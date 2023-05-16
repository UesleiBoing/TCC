import { AiFillHome, AiOutlineForm } from "react-icons/ai";
import { CgLogOut } from "react-icons/cg";
import { FaUserGraduate, FaUserTie, FaWpforms } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { GiRank3 } from "react-icons/gi";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { MdClass, MdSubject, MdTopic } from "react-icons/md";

export const sidebarDataTeacher = [
    [
        { title: 'Home',        path: '/ranking',     icon: <AiFillHome />,     },
        { title: 'Perfil',      path: '/profile',       icon: <FiUser />,     },
        { title: 'Estudantes',  path: '/students',      icon: <FaUserGraduate />, },
       // { title: 'Professores', path: '/teachers',      icon: <FaUserTie />,      },
    ],
    [
        { title: 'Matérias',    path: '/subjects',      icon: <MdSubject />,      },
        { title: 'Classes',     path: '/classes',       icon: <MdClass />,        },
        { title: 'Níveis',      path: '/topics',        icon: <MdTopic />,        },
        { title: 'Formulários', path: '/forms',         icon: <AiOutlineForm />,  },
        { title: 'Logout',      path: '/',              icon: <CgLogOut />,       },
    ]
];

export const sidebarDataStudent = [
    [
        { title: 'Home',             path: '/dashboard',     icon: <AiFillHome />,     },
        { title: 'Perfil',           path: '/profile',       icon: <FiUser />,     },
        { title: 'Ranking',          path: '/ranking',       icon: <GiRank3 />,      },
        { title: 'Classes',          path: '/classes',       icon: <MdClass />,        },
        { title: 'Níveis',           path: '/topics',        icon: <MdTopic />,        },
        { title: 'Gerar Formulário', path: '/forms',         icon: <AiOutlineForm />,      },
        { title: 'Testes',           path: '/tests',         icon: <FaWpforms />,      },
        { title: 'Logout',           path: '/',              icon: <CgLogOut />,       },
    ]
];