import heroImage from './images/hero.jpg'
import type { LocalizedText } from '../types'

// ─────────────────────────────────────────────────────────────
// JOB CONTENT
//
// Add, remove, or reorder vacancies in `jobListings`. Every
// visitor-facing field has an English and Chinese counterpart.
// ─────────────────────────────────────────────────────────────

export const jobsImages = {
  hero: heroImage,
}

export interface Job {
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

export interface JobFaq {
  question: LocalizedText
  answer: LocalizedText
}

export const jobFaqs: JobFaq[] = [
  {
    question: { en: 'what positions are currently available?', zh: '目前有哪些开放职位？' },
    answer: {
      en: 'we currently have openings for a senior architect, interior designer, and urban designer. we are also accepting internship applications on an ongoing basis. please see the listings above for full details.',
      zh: '我们目前在招募高级建筑师、室内设计师和城市设计师，同时持续接受实习申请。详情请参阅上方招聘列表。',
    },
  },
  {
    question: { en: 'do you accept internship applications?', zh: '是否接受实习申请？' },
    answer: {
      en: 'yes. we welcome applications from motivated architectural and design students for internship positions. internships are typically for a minimum of six months and are available across architecture, interior design, and urban design.',
      zh: '是的。我们欢迎积极上进的建筑与设计专业学生申请实习职位。实习通常最短六个月，涵盖建筑、室内设计和城市设计领域。',
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
      en: 'we accept pdf and docx files for your resume and cover letter. for portfolios, pdf is preferred, with a maximum file size of 20mb. if your portfolio is hosted online, you may also share a link.',
      zh: '简历和求职信接受PDF和DOCX格式。作品集建议使用PDF格式，最大文件大小为20MB。如作品集托管在线上，也可分享链接。',
    },
  },
]

export const jobListings: Job[] = [
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
    title: 'interior designer',
    zhTitle: '室内设计师',
    department: 'interior design',
    zhDepartment: '室内设计',
    location: 'singapore',
    type: 'full-time',
    zhType: '全职',
    description:
      'we are seeking a skilled interior designer with experience in hospitality and high-end residential projects. you will work closely with our interior design lead on a portfolio of exciting commissions across southeast asia.',
    zhDescription:
      '我们正在寻找一位在酒店及高端住宅项目方面经验丰富的室内设计师。您将与室内设计负责人紧密合作，参与整个东南亚的精彩委托项目。',
    requirements: [
      'minimum 4 years of professional experience',
      'proficiency in autocad, sketchup, and 3ds max or enscape',
      'strong material and finish specification skills',
      'experience with ff&e procurement',
      'attention to detail and passion for craft',
    ],
    zhRequirements: [
      '至少4年专业经验',
      '熟练使用AutoCAD、SketchUp及3ds Max或Enscape',
      '较强的材料与饰面规格制定能力',
      '具有FF&E采购经验',
      '对工艺的细节把控力与热情',
    ],
  },
  {
    title: 'urban designer',
    zhTitle: '城市设计师',
    department: 'urban planning',
    zhDepartment: '城市规划',
    location: 'singapore',
    type: 'full-time',
    zhType: '全职',
    description:
      'we are looking for a thoughtful urban designer to join our planning and masterplanning team. you will contribute to large-scale urban design and masterplanning commissions across southeast asia.',
    zhDescription:
      '我们正在寻找一位具有深度思考能力的城市设计师加入我们的规划与总体规划团队。您将参与整个东南亚的大型城市设计与总体规划项目。',
    requirements: [
      'degree in urban design, urban planning, or architecture',
      'minimum 3 years of professional experience in urban design',
      'proficiency in autocad, arcgis, and adobe suite',
      'strong research and analytical skills',
      'experience preparing planning and design reports',
    ],
    zhRequirements: [
      '城市设计、城市规划或建筑学学位',
      '至少3年城市设计专业经验',
      '熟练使用AutoCAD、ArcGIS及Adobe套件',
      '较强的研究与分析能力',
      '具有编制规划与设计报告的经验',
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
