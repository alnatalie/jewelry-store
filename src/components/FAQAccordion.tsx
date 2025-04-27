'use client';

import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function FAQAccordion({ questions }: {
  questions: {
    question: string;
    answer: string;
  }[]
}) {
  return (
    <>
      {questions.map((item, index) => (
        <Accordion key={index} sx={{ mb: 1 
        }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              '&:hover': { backgroundColor: 'action.hover' }
            }}
          >
            <Typography sx={{ fontWeight: 'medium' }}>
              {item.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="text.secondary">
              {item.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}