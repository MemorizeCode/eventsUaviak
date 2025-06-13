import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './service/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async loadSpecial() {
    try {
      const isSpecial = await this.prisma.eventSpeciality.findMany();
      if (isSpecial.length > 0) {
        throw new HttpException(
          'Специальности уже существуют',
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.prisma.eventSpeciality.createMany({
        data: [
          //спец
          { title: '09.02.07 - Информационные системы и программирование' },
          { title: '15.02.16 - Технология машиностроения' },
          { title: '15.02.08 - Технология машиностроения' },
          {
            title:
              '23.02.07 - Техническое обслуживание и ремонт двигателей, систем и агрегатов автомобилей',
          },
          {
            title:
              '25.02.03 - Техническая эксплуатация электрифицированных и пилотажно-навигационных комплексов',
          },
          {
            title: '25.02.06 - Производсвто и обслуживание авиационной техники',
          },
          { title: '25.02.08 - Эксплуатация беспилотных авиационных систем' },
          {
            title:
              '23.02.05 - Эксплуатация транспортного электрооборудования и автоматики (по видам транспорта, за исключением водного)',
          },
          {
            title:
              '05.02.16 - Эксплуатация и ремонт сельскохозяйственной техники и оборудования',
          },
          { title: '38.02.01 - Экономика и бухгалтерский учет (по отраслям)' },
          { title: '40.02.01 - Право и организация социального обеспечения' },
          { title: '40.02.04 - Юриспруденция' },
          { title: '38.02.03 - Операционна деятельность в логистике' },

          //проф
          {
            title:
              '15.01.05 - Сварщик (ручной и частично механизированной сварки (наплавки))',
          },
          { title: '15.01.32 - Оператор станков с программным управлением' },
          {
            title:
              '15.01.38 - Оператор - наладчик металлообрабатывающих станков',
          },
          { title: '23.01.17 - Мастер по ремонту и обслуживанию автомобилей' },
          { title: '15.01.35 - Мастер слесарных работ' },
          { title: '41.01.09 - Повар, кондитер' },
          { title: '24.01.01 - Слесарь-сборщик авиационной техники' },
          { title: '09.01.03 - Оператор информационных систем и ресурсов' },
          { title: '15.01.29 - Контроллер качества в машиностроении' },
          { title: '43.01.09 Повар, кондитер' },
          { title: '35.02.16 Эксплуатация и ремонт сельскохозяйственной техники и оборудования' },
        ],
      });
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(
        'Ошибка сервера. Попробуйте позже',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async loadEvents(){
    try{
      const isEvents = await this.prisma.events.findMany()
      if(isEvents.length > 0){
        throw new HttpException("Мероприятия тестовые уже есть", HttpStatus.BAD_GATEWAY)
      }
      const events = await this.prisma.events.createMany({
        data: [
          {
            title: "Разработка мобильных приложений",
            description: "Проф-проба по созданию мобильного приложения на языке программирования Kotlin в среде программирования Android Studio, знакомство с разметкой и кодом приложения",
            date: "2025-11-14T14:00:00.000Z",
            times: "14:00",
            duration: 60,
            cabinet: '404',
            people_count: 12,
            specialityId: 1,
            prepod: "Мардамшина А.А , Андреева Е.А",
            whoClasses: '7'
          },
          {
            title: "Веб-разработка",
            description: "Проф-проба по разработке одностраничного сайта с использованием современных технологий сайто-строения",
            date: "2025-11-12T14:00:00.000Z",
            times: "14:00",
            duration: 60,
            cabinet: '420',
            people_count: 12,
            specialityId: 1,
            prepod: "Кирилина М.А , Гнеушев С.А",
            whoClasses: '8'
          },
          {
            title: "Программирование",
            description: "Проф-проба по созданию программы-парсера с использованием технологий работы с веб-страницами и базами данных",
            date: "2025-11-13T14:00:00.000Z",
            times: "14:00",
            duration: 60,
            cabinet: '411',
            people_count: 12,
            specialityId: 1,
            prepod: "Федосеев Я.А , Комиссарова Д.О",
            whoClasses: '8'
          },
          {
            title: "Разработка компьютерных игр",
            description: "Проф-проба по созданию персонала и сцены в компьютерной игры в Unity",
            date: "2025-11-14T14:00:00.000Z",
            times: "14:00",
            duration: 60,
            cabinet: '427',
            people_count: 12,
            specialityId: 1,
            prepod: "Ефремов Д.Ю , Панфилов А.А",
            whoClasses: '8'
          },
          {
            title: "Профпроба  «ВЕБ-КВЕСТ",
            description: "Веб-квест о профессии автомеханик",
            date: "2026-01-21T14:00:00.000Z",
            times: "14:00",
            duration: 45,
            cabinet: '423',
            people_count: 15,
            specialityId: 4,
            prepod: "Асадуллин Р.Я.",
            whoClasses: '7'
          },
          {
            title: "«Введение в профессию мастер по ремонту автомобилей»",
            description: "Мастер-класс по профессии автомеханик",
            date: "2026-01-27T14:00:00.000Z",
            times: "14:00",
            duration: 45,
            cabinet: '423',
            people_count: 20,
            specialityId: 17,
            prepod: "Асадуллин Р.Я.",
            whoClasses: '7'
          },
          {
            title: "Профпроба  «Посвящение в электрику»",
            description: "Ознакомление, сборка и тестирование электрических схем автомобиля.",
            date: "2026-02-04T14:00:00.000Z",
            times: "14:00",
            duration: 45,
            cabinet: '420',
            people_count: 15,
            specialityId: 8,
            prepod: "Иноземцев А.А.",
            whoClasses: '8'
          },
          {
            title: "«Фигурное вождение трактора»",
            description: "Вождение трактора на учебном полигоне с выполнением элементов экзамена.",
            date: "2026-01-21T13:00:00.000Z",
            times: "13:00",
            duration: 45,
            cabinet: '419',
            people_count: 15,
            specialityId: 24,
            prepod: "Козлов А.А.",
            whoClasses: '8'
          },
          {
            title: "Профпроба «Световое оборудование трактора»",
            description: "Проверка работоспособности, поиск и устранение неисправностей.",
            date: "2026-02-03T15:00:00.000Z",
            times: "15:00",
            duration: 40,
            cabinet: '419',
            people_count: 20,
            specialityId: 24,
            prepod: "Титов Е.В.",
            whoClasses: "6"
          },
          {
            title: "Биология и химия в профессии «Повар»",
            description: "Проведение демонстрационных опытов на определение компонентов пищи (углеводы и ферменты), определение экологической безопасности и качество продуктов питания (на примере икры), викторина «Еда через века»",
            date: "2026-04-02T14:00:00.000Z",
            times: "14:00",
            duration: 45,
            cabinet: '108',
            people_count: 25,
            specialityId: 23,
            prepod: "Зудова Т.А., Солуянова Л.П.",
            whoClasses: "7-9"
          },
          {
            title: "Основы электромонтажа",
            description: "Проф-проба по пайке на монтажной плате элементов автоматизированного управления (освещение) и прозвонка собранной цепи с использованием цифрового тестера",
            date: "2026-04-17T14:00:00.000Z",
            times: "14:00",
            duration: 45,
            cabinet: '111',
            people_count: 15,
            specialityId: 5,
            prepod: "Просвирнов Ю.А.",
            whoClasses: "7-8"
          }
        ]
      })
    }
    catch(e){
      if(e instanceof HttpException){
        throw e
      }
      throw new HttpException(
        'Ошибка сервера. Попробуйте позже',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

}
