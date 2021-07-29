/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   10828.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/25 22:10:14 by secho             #+#    #+#             */
/*   Updated: 2020/04/25 22:57:07 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdio.h>
#include <stdlib.h>

# define MAX_SIZE 10000

typedef struct s_stack
{
	int size;
	int *data;
	int top;
}				t_stack;

t_stack *stack_init()
{
	t_stack *stack;

	if(!(stack = malloc(sizeof(t_stack))))
		return (NULL);
	stack->top = -1;
	stack->size = 0;
	if(!(stack->data = malloc(sizeof(int) * MAX_SIZE)))
		return (NULL);
	return (stack);
}

int		isEmpty(t_stack *stack)
{
	if(stack == NULL || stack->size == 0)
		return (1);
	return (0);
}

void	push(t_stack *stack, int input)
{
	if(stack->top + 1 >= MAX_SIZE)
		return ;
	stack->top++;
	stack->data[stack->top] = input;
	stack->size++;
}

void	pop(t_stack *stack)
{
	if(isEmpty(stack) || stack->top <= -1)
	{
		printf("-1\n");
		return ;
	}
	printf("%d\n",stack->data[stack->top]);
	stack->data[stack->top] = 0;
	stack->top--;
	stack->size--;
}

int		peek(t_stack *stack)
{
	if(isEmpty(stack))
		return (-1);
	return (stack->data[stack->top]);
}

int main(void)
{
	int		data;
	int 	order;
	char	type[6];
	t_stack *stack;

	stack = stack_init();
	scanf("%d",&order);
	for(int i = 0; i < order; i++)
	{
		scanf("%s",type);
		if(type[1] == 'u')
		{
			scanf("%d",&data);
			push(stack, data);
		}
		else if(type[0] == 't')
			printf("%d\n",peek(stack));
		else if(type[0] == 's')
			printf("%d\n",stack->size);
		else if(type[0] == 'e')
			printf("%d\n",isEmpty(stack));
		else if(type[1] == 'o')
			pop(stack);
	}
	return (0);
}
