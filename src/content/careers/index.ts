import heroImage from './images/hero.jpg'
import type { LocalizedText } from '../types'

// ─────────────────────────────────────────────────────────────
// CAREER CONTENT
//
// Add, remove, or reorder vacancies in `careerListings`. Every
// visitor-facing field has an English and Chinese counterpart.
// ─────────────────────────────────────────────────────────────

export const careersImages = {
  hero: heroImage,
}

export interface CareerListing {
  title: string
  zhTitle: string
  department: string
  zhDepartment: string
  location: string
  type: string
  zhType: string
  description: string
  zhDescription: string
  requirements: string[]
  zhRequirements: string[]
}

export interface CareerFaq {
  question: LocalizedText
  answer: LocalizedText
}

export const careerFaqs: CareerFaq[] = [
  {
    question: { en: 'what positions are currently available?', zh: '目前有哪些开放职位？' },
    answer: {
      en: 'we currently have openings for a senior architect, architectural designer, and architectural intern. please see the listings above for full details.',
      zh: '我们目前在招募高级建筑师、建筑设计师和建筑实习生。详情请参阅上方招聘列表。',
    },
  },
  {
    question: { en: 'do you accept internship applications?', zh: '是否接受实习申请？' },
    answer: {
      en: 'yes. we welcome applications from motivated architecture students for architectural internship positions. internships are typically for a minimum of six months.',
      zh: '是的。我们欢迎积极上进的建筑专业学生申请建筑实习职位。实习期通常最短为六个月。',
    },
  },
  {
    question: { en: 'what should be included in my portfolio?', zh: '作品集应包含哪些内容？' },
    answer: {
      en: 'your portfolio should be a concise, curated selection of your best work — typically 15-25 pages. include a range of projects that demonstrate your design skills, technical ability, and creative thinking. do not simply include everything you have ever made.',
      zh: '您的作品集应是精心挑选的最佳作品集锦，通常为15-25页。请包含能展示设计能力、技术水平和创意思维的多类项目，切勿将所有作品一并放入。',
    },
  },
  {
    question: { en: 'can i submit a general application?', zh: '可以提交主动申请吗？' },
    answer: {
      en: 'yes. if you do not see a role that matches your profile but believe you would be a strong addition to the team, we welcome general applications. please describe your skills and interests clearly in your cover note.',
      zh: '可以。如果您未找到与自身背景匹配的职位，但认为自己能为团队带来价值，欢迎提交主动申请。请在求职信中清晰描述您的技能与兴趣。',
    },
  },
  {
    question: { en: 'when will i hear back after applying?', zh: '申请后何时会收到回复？' },
    answer: {
      en: 'we aim to respond to all applications within four weeks of receipt. if you have not heard from us after four weeks, please feel free to follow up by email.',
      zh: '我们力争在收到申请后四周内回复所有申请人。如超过四周仍未收到回复，欢迎通过邮件跟进。',
    },
  },
  {
    question: { en: 'what file formats can i upload?', zh: '可以上传哪些文件格式？' },
    answer: {
      en: 'combine your resume, cover letter, and portfolio into one zip file with a maximum file size of 10mb. if your portfolio is hosted online, you may also include a link in your message.',
      zh: '请将简历、求职信和作品集合并为一个ZIP文件，文件大小不得超过10MB。如作品集托管在线上，也可在留言中附上链接。',
    },
  },
]

export const careerListings: CareerListing[] = [
  {
    title: 'senior architect',
    zhTitle: '高级建筑师',
    department: 'architecture',
    zhDepartment: '建筑设计',
    location: 'singapore',
    type: 'full-time',
    zhType: '全职',
    description:
      'we are looking for a talented and experienced senior architect to join our singapore studio. the successful candidate will lead design on a range of projects across residential, hospitality, and civic sectors.',
    zhDescription:
      '我们正在寻找一位才华横溢、经验丰富的高级建筑师加入我们的新加坡工作室。成功候选人将主导住宅、酒店及公共建筑等多类项目的设计工作。',
    requirements: [
      'minimum 8 years of professional experience',
      'registered architect in singapore or overseas equivalent',
      'proficiency in revit, autocad, and rhino',
      'strong portfolio demonstrating design leadership',
      'excellent communication and presentation skills',
    ],
    zhRequirements: [
      '至少8年专业经验',
      '持有新加坡注册建筑师资格或同等境外资格',
      '熟练使用Revit、AutoCAD和Rhino',
      '具备充分展示设计领导力的作品集',
      '出色的沟通与演示能力',
    ],
  },
  {
    title: 'architectural designer',
    zhTitle: '建筑设计师',
    department: 'architecture',
    zhDepartment: '建筑设计',
    location: 'singapore',
    type: 'full-time',
    zhType: '全职',
    description:
      'we are seeking a thoughtful architectural designer to join our singapore studio. you will contribute to design development, visualisation, and documentation across a diverse range of projects in southeast asia.',
    zhDescription:
      '我们正在寻找一位富有思考力的建筑设计师加入新加坡工作室。您将参与东南亚多类型项目的设计深化、视觉表达及技术文件编制。',
    requirements: [
      'degree in architecture or an equivalent qualification',
      'minimum 2 years of professional experience',
      'proficiency in revit, autocad, rhino, and adobe suite',
      'strong design, visualisation, and technical documentation skills',
      'collaborative approach and clear communication skills',
    ],
    zhRequirements: [
      '建筑学学位或同等学历',
      '至少2年专业经验',
      '熟练使用Revit、AutoCAD、Rhino及Adobe套件',
      '具备较强的设计、视觉表达及技术文件编制能力',
      '具备团队协作精神及清晰的沟通能力',
    ],
  },
  {
    title: 'architectural intern',
    zhTitle: '建筑实习生',
    department: 'architecture',
    zhDepartment: '建筑设计',
    location: 'singapore',
    type: 'internship',
    zhType: '实习',
    description:
      'we welcome applications from motivated architectural students for internship positions within our singapore studio. interns will work alongside experienced architects on live projects across a range of sectors.',
    zhDescription:
      '我们欢迎有积极性的建筑专业学生申请我们新加坡工作室的实习职位。实习生将与经验丰富的建筑师并肩参与跨多类型领域的实际项目。',
    requirements: [
      'currently enrolled in a recognised architecture programme',
      'minimum 6-month internship period',
      'proficiency in autocad and sketchup',
      'strong hand drawing and model-making skills',
      'genuine curiosity and enthusiasm for architecture',
    ],
    zhRequirements: [
      '目前在读并获认可的建筑学专业',
      '实习期最短六个月',
      '熟练使用AutoCAD和SketchUp',
      '较强的手绘及模型制作能力',
      '对建筑的真挚好奇心与热情',
    ],
  },
]
