import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Rise } from '@/shared/ui'

import { FAQ } from './faq-data'

export function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-6xl px-5 py-20">
      <Rise>
        <p className="text-center text-[13px] font-bold uppercase tracking-[0.18em] text-sage-700">
          Вопрос — ответ
        </p>
        <h2 className="mt-3 text-center font-display text-[clamp(1.8rem,3.5vw,2.7rem)] tracking-tight">
          Отвечаю на частые вопросы
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center leading-relaxed text-ink-soft">
          Настоящие вопросы от людей и мои ответы на них. Если вашего вопроса здесь
          нет — напишите, отвечу лично.
        </p>
      </Rise>

      <Rise delay={0.1}>
        <Accordion type="single" collapsible className="mx-auto mt-12 flex max-w-3xl flex-col gap-3">
          {FAQ.map(({ q, a }) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger>{q}</AccordionTrigger>
              <AccordionContent>
                {a.map((para, i) => (
                  <p key={i} className="text-[15px]">{para}</p>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Rise>
    </section>
  )
}
